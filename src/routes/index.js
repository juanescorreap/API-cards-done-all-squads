const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const router = Router()

// Routes
router.get('/count/:squad', async (req, res) => {
    var reqSquad = req.params['squad']
    const querySquad = getSquadName(reqSquad)
    var results = await getResults(querySquad)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(results));
})
// Routes

const fetch = require('node-fetch')
const { json } = require('express/lib/response')
const counterBySquad = []

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query"

function request(body) {
    return {
        method: 'POST',
        headers: {
            'Authorization': ' Bearer secret_6ChP3bBJktR1IwHXAb0q5oJAXhboEJNeQ1lM3vCMnLx',
            'Notion-Version': '2021-05-13',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

function getSquadName(string) {
    return string.split("-").join(" ")
}

function getCounterBySquad(squadName, priority) {
    let jsonPerSquad = counterBySquad.filter(objSquad => objSquad.squad == squadName && objSquad.priority == priority)
    if (jsonPerSquad.length == 0) { // initialize the new object to start counting
        jsonPerSquad = {
            "squad": squadName,
            "number": 0,
            "priority": priority,
            "typeOfBug": "Bug",
            "fixed": 0
        }
        counterBySquad.push(jsonPerSquad)
        return [jsonPerSquad]
    }
    return jsonPerSquad
}

function filterContent(squad) {
    return  {"and":[{"property":"Squad","multi_select":{"contains":`${squad}`}},{"property":"Assignees","people":{"does_not_contain":"d7e5b1d6-b838-4ed7-bc23-3035b6b09d90"}},{"property": "Type","multi_select": {"is_not_empty": true}},{"property": "Priority","select": {"is_not_empty": true}},{"or":[{"property":"Type","multi_select":{"does_not_contain":"On hold"}},{"property":"Type","multi_select":{"does_not_contain":"Post-release bug"}}]},{"or":[{"property":"Type","multi_select":{"contains":"Bug"}},{"property":"Type","multi_select":{"contains":"Post-release bug"}}]},{"or":[{"property":"Stage","select":{"equals":"✅   Done"}},{"property":"Stage","select":{"equals":"🚀   New functionalities"}},{"property":"Stage","select":{"equals":"🚩 Feature flag release"}},{"property":"Stage","select":{"equals":"🏃 Optimization analysis"}},{"property":"Stage","select":{"equals":"📦 Pull request merged"}}]}]}
}

function body(next_cursor, has_more, squadBody) {
    let content = {
        "filter": filterContent(squadBody),
        "sorts":[{"property":"Last edited time","direction":"descending"}]
    }

    let contentCursor = {
        "filter": filterContent(squadBody),
        "sorts":[{"property":"Last edited time","direction":"descending"}],
        "start_cursor": next_cursor
    }

    if (has_more) {
        console.log("has_more", contentCursor)
        return contentCursor
    } else {
        console.log("regular call", content)
        return content
    }
}

async function requestFunction(next_cursor_fun,result_pagination, squadBody) {
    const resultTemp = await fetch(apiURL, request(body(next_cursor_fun, result_pagination, squadBody)))
        .then(response => response.json())
        .then(response => { return (response) })
    return resultTemp
}

const getResults = async (squad) => {
    let triggerfun = true
    let result_pagination = true
    let next_cursor_fun = ''
    let cardCounter = 0
    let objAllCards = []

    function trigger_pagination(prop) {
        if (prop) {
            result_pagination = true
            triggerfun = true
        } else {
            result_pagination = false
            next_cursor_fun = ''
        }

    }

    trigger_pagination(true)
    while (result_pagination != false) {
        if (triggerfun) {
            trigger_pagination(false)
            triggerfun = false
        }
        try {
            result = await requestFunction(next_cursor_fun, result_pagination,squad)
        } catch (err) {
            console.error("error -->",err)
        }
        cardCounter += result.results.length
        result_pagination = result.has_more;
        next_cursor_fun = result.next_cursor;
        console.log(cardCounter);

        const objResponse = JSON.parse(JSON.stringify(result))
        objResponse.results.map(card => {
            objAllCards.push(card)
        })
    }

    objAllCards.map(card => {
        const props = card.properties;
        const labels = props["Type"].multi_select
        let shouldAdd = 0

        labels.map(label => {
            if (label.name == "On hold" || label.name == "Not a bug"){
                shouldAdd++
            }
        })

        if(shouldAdd == 0){
            const filterResumedCards = getCounterBySquad(squad, props.Priority.select.name)
            filterResumedCards.map(squadFound => {
                squadFound.number++
            })
        }
    })

    const jsonResponse = JSON.stringify(counterBySquad)
    counterBySquad.length = 0

    let today = new Date()
    today = today.toISOString().split('T')[0]

    fs.writeFile(path.join(__dirname, `../jsonfiles/${today}-${squad}.json`), jsonResponse, (err) => {
        if (err) {
            console.error("Error saving the json")
            console.error(err)
        } else {
            console.log(`JSON Saved successfully ${today}-${squad}.json`);
        }
    })

    const apiWebhookZapier = 'https://hooks.zapier.com/hooks/catch/3321237/bf9f8se/'
    const triggerZapier = await fetch(apiWebhookZapier, request(jsonResponse))
    // console.log(triggerZapier)

    return JSON.stringify({
        cardsCounting: JSON.parse(jsonResponse)
    })
}

module.exports = router