
const fetch = require('node-fetch');

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query";

const listSquads = ['Work squad', 'Talent squad', 'UGG squad', 'Genome squad']


function request(body){
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
const pull_request_merged = "📦 Pull request merged"
const pull_request = "🧐  Pull request"
const done = "✅   Done"
const optimization_analysis = "🏃 Optimization analysis"
const feature_flag_release = "🚩 Feature flag release"

function body(next_cursor, has_more, squadBody, bugOrDone){
    let content = {
        "filter": {
            "and": [
                {
                    "property": "Stage",
                    "select": {
                        "equals": bugOrDone
                    }
                },
                {
                    "property": "Squad",
                    "multi_select": {
                        "contains": squadBody
                    }
                }
            ]
        }

    }

    let contentCursor = {
        "filter": {
            "and": [
                {
                    "property": "Stage",
                    "select": {
                        "equals": bugOrDone
                    }
                },
                {
                    "property": "Squad",
                    "multi_select": {
                        "contains": squadBody
                    }
                }
            ]
        },
        "start_cursor": next_cursor

    }

    if (has_more) {
        return contentCursor
    } else {
        return content
    }
}





async function requestFunction (squadBody, bugOrDone){
    const resultTemp = await fetch(apiURL, request({
        "filter": {
            "and": [
                {
                    "property": "Stage",
                    "select": {
                        "equals": "✅   Done"
                    }
                },
                {
                    "property": "Squad",
                    "multi_select": {
                        "contains": 'Work squad'
                    }
                }
            ]
        }

    }))
        .then(response => response.json())
        .then(response => { return (response) })

        console.log(resultTemp)

        if (resultTemp.has_more) {
            next_cursor = resultTemp.next_cursor
            result_hash_more = resultTemp.has_more
        } else {
            result_hash_more = resultTemp.has_more
        }


    return resultTemp.results

}


var result
var trigger = true
function trigger_hash_more(props){
    if (props) {
        result_hash_more = true
        trigger = true
    } else {
        result_hash_more = false
    }
}


var result_hash_more = false
var next_cursor = ''
let workSquadDone = 0;
let talentSquadDone = []
let uggSquadDone = []
let genomeSquadDone = []

var SquadsDone = [workSquadDone, talentSquadDone, uggSquadDone, genomeSquadDone]


const getResults = async() =>{
    result = await requestFunction(listSquads[0], done)
    return result;
    
}




module.exports = getResults();;