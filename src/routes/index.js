const { Router } = require('express')
const path = require('path')
const fs = require('fs')
const router = Router()


const priority = ['Medium', 'High', 'Highest']
const typeBug = ['Bug', 'Post-release bug']

// Routes



router.get('/trigger-al-aa-ps/:typeofbug/:priority/:typeofprocess', async (req, res) => {
    /*     console.log(req.params['typeofbug'])
        res.json(req.params['typeofbug']); */
    const reqPriority = req.params['priority'].toLowerCase()
    const reqTypeofbug = req.params['typeofbug'].toLowerCase()
    const reqTypeofProcess = req.params['typeofprocess'].toLowerCase()

    console.log(100, reqPriority, reqTypeofbug)

    switch (true) {
        case (reqPriority == 'medium' && reqTypeofbug == 'bug'):
            var results = await getResults(priority[0], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'medium' && reqTypeofbug == 'post-release-bug'):
            var results = await getResults(priority[0], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'bug'):
            var results = await getResults(priority[1], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'post-release-bug'):
            var results = await getResults(priority[1], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'bug'):
            var results = await getResults(priority[2], typeBug[0],reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'post-release-bug', reqTypeofProcess):
            var results = await getResults(priority[2], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        default:
            res.json(({ "message": "I couldn't find that route, sorry" }))
    }

    dataTemplatejson = [
        {
            "squad": "Algorithms squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Applicants acquisition squad",
            "number": 2,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Platform squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }
    ]
})


router.get('/trigger-g-ugg-w/:typeofbug/:priority', async (req, res) => {

    const reqPriority = req.params['priority'].toLowerCase()
    const reqTypeofbug = req.params['typeofbug'].toLowerCase()

    switch (true) {
        case (reqPriority == 'medium' && reqTypeofbug == 'bug'):
            var results = await getResultsSecondList(priority[0], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'medium' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsSecondList(priority[0], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'bug'):
            var results = await getResultsSecondList(priority[1], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsSecondList(priority[1], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'bug'):
            var results = await getResultsSecondList(priority[2], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsSecondList(priority[2], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        default:
            res.json(({ "message": "I couldn't find that route, sorry" }))
    }

})

router.get('/trigger-t-tsas/:typeofbug/:priority', async (req, res) => {

    const reqPriority = req.params['priority'].toLowerCase()
    const reqTypeofbug = req.params['typeofbug'].toLowerCase()

    switch (true) {
        case (reqPriority == 'medium' && reqTypeofbug == 'bug'):
            var results = await getResultsThirdList(priority[0], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'medium' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsThirdList(priority[0], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'bug'):
            var results = await getResultsThirdList(priority[1], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsThirdList(priority[1], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'bug'):
            var results = await getResultsThirdList(priority[2], typeBug[0], reqTypeofProcess)
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsThirdList(priority[2], typeBug[1], reqTypeofProcess)
            res.json(((results)))
            break
        default:
            res.json(({ "message": "I couldn't find that route, sorry" }))
    }


})







///Code


const fetch = require('node-fetch')
const { json } = require('express/lib/response')

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query"


var dataTemplatejson = [
    {
        "squad": "Algorithms squad",
        "number": "",
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "Algorithms squad",
        "number": "",
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "Algorithms squad",
        "number": "",
        "priority": "",
        "typeOfBug": ""
    }
]


const listSquads = ['Algorithms squad', 'Applicants acquisition squad', 'Platform squad']/* , 'Genome squad','Work squad', 'Talent squad', 'UGG squad','Talent seeker acquisition squad'] */
const secondListSquads=['Genome squad', 'UGG squad','Work squad']
const thirdListSquads = ['Talent squad', 'Talent seeker acquisition squad']


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
const pull_request_merged = "📦 Pull request merged"
const done = "✅   Done"
const optimization_analysis = "🏃 Optimization analysis"
const feature_flag_release = "🚩 Feature flag release"


function typeOfProcesses(prop){
    switch(prop){
        case "done":
            return done
            break;
        case "pull-request-merged":
            return pull_request_merged
            break;
        case "optimization-analysis":
            return optimization_analysis
            break;
        case "feature-flag-release":
            return feature_flag_release
            break;
        default:
            return done
    }
}

function body(next_cursor, has_more, squadBody, bugOrDone, priority, typeBug) {
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
                }, {
                    "property": "Priority",
                    "select": {
                        "equals": priority
                    }
                }, {
                    "property": "Other labels",
                    "multi_select": {
                        "contains": typeBug
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
                }, {
                    "property": "Priority",
                    "select": {
                        "equals": priority
                    }
                }, {
                    "property": "Other labels",
                    "multi_select": {
                        "contains": typeBug
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





async function requestFunction(next_cursor_fun,result_pagination, squadBody, bugOrDone, priority, typeBug) {
    const resultTemp = await fetch(apiURL, request(body(next_cursor_fun, result_pagination, squadBody, bugOrDone, priority, typeBug)))
        .then(response => response.json())
        .then(response => { return (response) })


    return resultTemp

}



/* let algorithmsSquad = []
let applicantsAcquisitionSquad = []
let platformSquad = [] */
let genomeSquadDone = []
let workSquadDone = []
let talentSquadDone = []
let uggSquadDone = []
let talentSeekerAcquisitionSquad = []



/* var SquadsDone = [algorithmsSquad, applicantsAcquisitionSquad, platformSquad] *//* , genomeSquadDone, workSquadDone, talentSquadDone,uggSquadDone,talentSeekerAcquisitionSquad] */
/* var SquadDoneSecondList = [genomeSquadDone, uggSquadDone, workSquadDone]/* ,workSquadDone,talentSeekerAcquisitionSquad] */
/* var SquadDoneThirdList = [talentSquadDone, talentSeekerAcquisitionSquad] */


const getResults = async (priority, typeBug, reqTypeofProcess) => {
    
    let algorithmsSquad = []
    let applicantsAcquisitionSquad = []
    let platformSquad = []
    var SquadsDone = [algorithmsSquad, applicantsAcquisitionSquad, platformSquad]
    let triggerfun = true
    let result_pagination = true
    let next_cursor_fun = '';

    let data_AL_AA_PS = [
        {
            "squad": "Algorithms squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Applicants acquisition squad",
            "number": 2,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Platform squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }
    ]

    function trigger_pagination(prop) {
        if (prop) {
            result_pagination = true
            triggerfun = true
        } else {
            result_pagination = false
            next_cursor_fun = ''
        }

    }

    for (let i = 0; i < listSquads.length; i++) {
        trigger_pagination(true)
        while (result_pagination != false) {
            if (triggerfun) {
                trigger_pagination(false)
                triggerfun = false
            }
            try {
                result = await requestFunction(next_cursor_fun, result_pagination,listSquads[i], typeOfProcesses(reqTypeofProcess), priority, typeBug)
            } catch (err) {
                console.log(err)
            }
            SquadsDone[i] = [...SquadsDone[i], result.results.length]
            result_pagination = result.has_more;
            next_cursor_fun = result.next_cursor;
            console.log(i)
            console.log(result.next_cursor)
            console.log(SquadsDone);
            console.log(next_cursor_fun);
            console.log(result_pagination)

        }

    }

    var counterone = 0, countertwo = 0, counterthree = 0

    for (let i = 0; i < SquadsDone[0].length; i++) {
        counterone = counterone + SquadsDone[0][i]
    }

    for (let i = 0; i < SquadsDone[1].length; i++) {
        countertwo = countertwo + SquadsDone[1][i]
    }

    for (let i = 0; i < SquadsDone[2].length; i++) {
        counterthree = counterthree + SquadsDone[2][i]
    }

    console.log(SquadsDone[0])
    console.log(SquadsDone[1])
    console.log(SquadsDone[2])

    data_AL_AA_PS[0].squad = 'Algorithms squad'
    data_AL_AA_PS[0].number = counterone
    data_AL_AA_PS[0].priority = priority
    data_AL_AA_PS[0].typeOfBug = typeBug

    data_AL_AA_PS[1].squad = 'Applicants acquisition squad'
    data_AL_AA_PS[1].number = countertwo
    data_AL_AA_PS[1].priority = priority
    data_AL_AA_PS[1].typeOfBug = typeBug

    data_AL_AA_PS[2].squad = 'Platform squad'
    data_AL_AA_PS[2].number = counterthree
    data_AL_AA_PS[2].priority = priority
    data_AL_AA_PS[2].typeOfBug = typeBug




    return JSON.stringify(data_AL_AA_PS)

}


const getResultsSecondList = async (priority, typeBug, reqTypeofProcess) => {
    
    
    let genomeSquadDone = []
    let workSquadDone = []
    let uggSquadDone = []
    var SquadDoneSecondList = [genomeSquadDone, uggSquadDone, workSquadDone]
    let triggerfun = true
    let result_pagination = true
    let next_cursor_fun = '';

    let data_G_UGG_W = [
        {
            "squad": "Genome squad",
            "number": "",
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "UGG squad",
            "number": "",
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Work squad",
            "number": "",
            "priority": "",
            "typeOfBug": ""
        }
    ]

    function trigger_pagination(prop) {
        if (prop) {
            result_pagination = true
            triggerfun = true
        } else {
            result_pagination = false
            next_cursor_fun = ''
        }

    }

    for (let i = 0; i < secondListSquads.length; i++) {
        trigger_pagination(true)
        while (result_pagination != false) {
            if (triggerfun) {
                trigger_pagination(false)
                triggerfun = false
            }
            try {
                result = await requestFunction(next_cursor_fun, result_pagination,secondListSquads[i], typeOfProcesses(reqTypeofProcess), priority, typeBug)
            } catch (err) {
                console.log(err)
            }
            SquadDoneSecondList[i] = [...SquadDoneSecondList[i], result.results.length]
            result_pagination = result.has_more;
            next_cursor_fun = result.next_cursor;
            console.log(i)
            console.log(result.next_cursor)
            console.log(SquadDoneSecondList);
            console.log(next_cursor_fun);
            console.log(result_pagination)

        }

    }

    var counterone = 0, countertwo = 0, counterthree = 0

    for (let i = 0; i < SquadDoneSecondList[0].length; i++) {
        counterone = counterone + SquadDoneSecondList[0][i]
    }

    for (let i = 0; i < SquadDoneSecondList[1].length; i++) {
        countertwo = countertwo + SquadDoneSecondList[1][i]
    }

    for (let i = 0; i < SquadDoneSecondList[2].length; i++) {
        counterthree = counterthree + SquadDoneSecondList[2][i]
    }

    console.log(SquadDoneSecondList[0])
    console.log(SquadDoneSecondList[1])
    console.log(SquadDoneSecondList[2])

    data_G_UGG_W[0].squad = 'Genome squad'
    data_G_UGG_W[0].number = counterone
    data_G_UGG_W[0].priority = priority
    data_G_UGG_W[0].typeOfBug = typeBug

    data_G_UGG_W[1].squad = 'UGG squad'
    data_G_UGG_W[1].number = countertwo
    data_G_UGG_W[1].priority = priority
    data_G_UGG_W[1].typeOfBug = typeBug

    data_G_UGG_W[2].squad = 'Work squad'
    data_G_UGG_W[2].number = counterthree
    data_G_UGG_W[2].priority = priority
    data_G_UGG_W[2].typeOfBug = typeBug




    return JSON.stringify(data_G_UGG_W)

}

const getResultsThirdList = async (priority, typeBug, reqTypeofProcess) => {
    
    let talentSeekerAcquisitionSquad = []
    let SquadDoneThirdList = [talentSquadDone, talentSeekerAcquisitionSquad]
    let triggerfun = true
    let result_pagination = true
    let next_cursor_fun = '';

    let data_T_TSAS = [
        {
            "squad": "Talent squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Talent seeker acquisition squad",
            "number": 2,
            "priority": "",
            "typeOfBug": ""
        }
    ]

    function trigger_pagination(prop) {
        if (prop) {
            result_pagination = true
            triggerfun = true
        } else {
            result_pagination = false
            next_cursor_fun = ''
        }

    }

    for (let i = 0; i < secondListSquads.length; i++) {
        trigger_pagination(true)
        while (result_pagination != false) {
            if (triggerfun) {
                trigger_pagination(false)
                triggerfun = false
            }
            try {
                result = await requestFunction(next_cursor_fun, result_pagination,secondListSquads[i], typeOfProcesses(reqTypeofProcess), priority, typeBug)
            } catch (err) {
                console.log(err)
            }
            SquadDoneThirdList[i] = [...SquadDoneThirdList[i], result.results.length]
            result_pagination = result.has_more;
            next_cursor_fun = result.next_cursor;
            console.log(i)
            console.log(result.next_cursor)
            console.log(SquadDoneThirdList);
            console.log(next_cursor_fun);
            console.log(result_pagination)

        }

    }

    var counterone = 0, countertwo = 0, counterthree = 0

    for (let i = 0; i < SquadDoneThirdList[0].length; i++) {
        counterone = counterone + SquadDoneThirdList[0][i]
    }

    for (let i = 0; i < SquadDoneThirdList[1].length; i++) {
        countertwo = countertwo + SquadDoneThirdList[1][i]
    }


    console.log(SquadDoneThirdList[0])
    console.log(SquadDoneThirdList[1])

    data_T_TSAS[0].squad = 'Talent squad'
    data_T_TSAS[0].number = counterone
    data_T_TSAS[0].priority = priority
    data_T_TSAS[0].typeOfBug = typeBug

    data_T_TSAS[1].squad = 'Talent seeker acquisition squad'
    data_T_TSAS[1].number = countertwo
    data_T_TSAS[1].priority = priority
    data_T_TSAS[1].typeOfBug = typeBug


    return JSON.stringify(data_T_TSAS)

}









module.exports = router