const { Router } = require('express')
const path = require('path')
const fs = require('fs')
const router = Router()

// Routes

router.get('/:squad', async (req, res) => {
    const reqSquad = req.params['squad']
    console.log("Squad -->", reqSquad)
    var results = await getResults(reqSquad)
    res.json(((results)))
})

///Code

const fetch = require('node-fetch')

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

function filterContent(squad) {
    return  {"and":[{"property":"Squad","multi_select":{"contains":`${squad} squad`}},{"property":"Assignees","people":{"does_not_contain":"d7e5b1d6-b838-4ed7-bc23-3035b6b09d90"}},{"or":[{"property":"Other labels","multi_select":{"contains":"Bug"}},{"property":"Other labels","multi_select":{"contains":"Post-release bug"}}]},{"or":[{"property":"Stage","select":{"equals":"✅   Done"}},{"property":"Stage","select":{"equals":"🚀   New functionalities"}},{"property":"Stage","select":{"equals":"🚩 Feature flag release"}},{"property":"Stage","select":{"equals":"🏃 Optimization analysis"}},{"property":"Stage","select":{"equals":"📦 Pull request merged"}}]}]}
}

function body(next_cursor, has_more, squadBody) {
    let content = {
        "filter": filterContent(squadBody)
    }

    let contentCursor = {
        "filter": filterContent(squadBody),
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

    let resumedCards = []

    objAllCards.map(card => {
        const props = card.properties;
        resumedCards.push({
            squasdOnCard: `${squad} squad`,
            priority: typeof props.Priority == 'undefined' ? '' : props.Priority.select.name,
            label: props["Other labels"].multi_select[0].name,
            stage: typeof props.Stage == 'undefined' ? '' : props.Stage.select.name,
            title: typeof props.dialog.title[0] == 'undefined' ? '' : props.dialog.title[0].text.content
        })
    })

    let objSquad = {"name":`${squad} squad`,"type":[{"name":"Bug","priority":[{"name":"Medium","count":0},{"name":"High","count":0},{"name":"Highest","count":0}]},{"name":"Post-release bug","priority":[{"name":"Medium","count":0},{"name":"High","count":0},{"name":"Highest","count":0}]}]}

    let counterBySquad = []

    objSquad.type.map(bugType => {
        bugType.priority.map(priority => {
            priority.count = resumedCards.filter(card => { return card.priority == priority.name && card.label == bugType.name}).length
            counterBySquad.push({
                squad: `${squad} squad`,
                number: priority.count,
                priority: priority.name,
                typeOfBug: bugType.name
            })
        })
    })

    return JSON.stringify({"resumed_cards": counterBySquad})
}

module.exports = router