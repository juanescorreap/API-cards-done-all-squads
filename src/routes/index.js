const { Router } = require('express')
const path = require('path')
const fs = require('fs')
const router = Router()


const priority = ['Medium', 'High', 'Highest']
const typeBug = ['Bug', 'Post-release bug']

// Routes



router.get('/trigger-al-aa-ps/:typeofbug/:priority', async (req, res) => {
    /*     console.log(req.params['typeofbug'])
        res.json(req.params['typeofbug']); */
    const reqPriority = req.params['priority'].toLowerCase()
    const reqTypeofbug = req.params['typeofbug'].toLowerCase()

    console.log(100, reqPriority, reqTypeofbug)

    switch (true) {
        case (reqPriority == 'medium' && reqTypeofbug == 'bug'):
            var results = await getResults(priority[0], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'medium' && reqTypeofbug == 'post-release-bug'):
            var results = await getResults(priority[0], typeBug[1])
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'bug'):
            var results = await getResults(priority[1], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'post-release-bug'):
            var results = await getResults(priority[1], typeBug[1])
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'bug'):
            var results = await getResults(priority[2], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'post-release-bug'):
            var results = await getResults(priority[2], typeBug[1])
            res.json(((results)))
            break
        default:
            res.json(({ "message": "I couldn't find that route, sorry" }))
    }

    dataTemplatejson=[
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
            var results = await getResultsSecondList(priority[0], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'medium' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsSecondList(priority[0], typeBug[1])
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'bug'):
            var results = await getResultsSecondList(priority[1], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsSecondList(priority[1], typeBug[1])
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'bug'):
            var results = await getResultsSecondList(priority[2], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsSecondList(priority[2], typeBug[1])
            res.json(((results)))
            break
        default:
            res.json(({ "message": "I couldn't find that route, sorry" }))
    }
    dataSecondSquadListJson =[
        {
            "squad": "Genome squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "UGG squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Work squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }
    ]
})

router.get('/trigger-t-tsas/:typeofbug/:priority', async (req, res) => {

    const reqPriority = req.params['priority'].toLowerCase()
    const reqTypeofbug = req.params['typeofbug'].toLowerCase()

    switch (true) {
        case (reqPriority == 'medium' && reqTypeofbug == 'bug'):
            var results = await getResultsThirdList(priority[0], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'medium' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsThirdList(priority[0], typeBug[1])
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'bug'):
            var results = await getResultsThirdList(priority[1], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'high' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsThirdList(priority[1], typeBug[1])
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'bug'):
            var results = await getResultsThirdList(priority[2], typeBug[0])
            res.json(((results)))
            break
        case (reqPriority == 'highest' && reqTypeofbug == 'post-release-bug'):
            var results = await getResultsThirdList(priority[2], typeBug[1])
            res.json(((results)))
            break
        default:
            res.json(({ "message": "I couldn't find that route, sorry" }))
    }


    dataThirdSquadListJson =[
        {
            "squad": "Talent squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }, {
            "squad": "Talent seeker acquisition squad",
            "number": 0,
            "priority": "",
            "typeOfBug": ""
        }
    ]
})


router.get('/changestate/:text', async (req, res) => {
    var dataSet = {
        data: ""
    }
    console.log(req.params['text'])
    dataSet['data'] = req.params['text']
    console.log(dataSet)
    fs.writeFile(path.join(__dirname, '../JSONFile/data_AL_AA_PS.json'), JSON.stringify(dataSet), function (err) {

    })

    res.send(JSON.stringify(dataSet))
})




router.get('/data-al-aa-ps', async (req, res) => {
    let dataSquad
    fs.readFile(path.join(__dirname, '../JSONFile/data_AL_AA_PS.json'), { encoding: 'utf-8' }, (err, jsonString) => {
        if (err) {
        } else {
            dataSquad = jsonString
            res.json(JSON.parse(dataSquad))
        }
    })
})

router.get('/data-g-ugg-w', async (req, res) => {
    let dataSquad
    fs.readFile(path.join(__dirname, '../JSONFile/data_G_UGG.json'), { encoding: 'utf-8' }, (err, jsonString) => {
        if (err) {
        } else {
            dataSquad = jsonString
            res.json(JSON.parse(dataSquad))
        }
    })
})

router.get('/data-t-tsas', async (req, res) => {
    let dataSquad
    fs.readFile(path.join(__dirname, '../JSONFile/data_T_TSAS.json'), { encoding: 'utf-8' }, (err, jsonString) => {
        if (err) {
        } else {
            dataSquad = jsonString
            res.json(JSON.parse(dataSquad))
        }
    })
})



///Code


const fetch = require('node-fetch')
const { json } = require('express/lib/response')

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query"

var dataTemplate = {
    algorithmsSquad: 0,
    applicantsAcquisitionSquad: 0,
    platformSquad: 0,
    algorithms:'algorithmsSquad',
    applicantsAcquisition: 'applicantsAcquisitionSquad',
    platform:'platformSquad'

}

var dataTemplatejson=[
    {
        "squad": "Algorithms squad",
        "number": 5,
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "Algorithms squad",
        "number": 2,
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "Algorithms squad",
        "number": 0,
        "priority": "",
        "typeOfBug": ""
    }
]

var dataSecondSquadList = {
    genomeSquadDone: 0,
    uggSquadDone: 0,
    workSquadDone: 0,
    genomeSquad:'genomeSquad',
    uggSquad:'uggSquad',
    workSquad:'workSquad'

}

var dataSecondSquadListJson =[
    {
        "squad": "Genome squad",
        "number": 0,
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "UGG squad",
        "number": 0,
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "Work squad",
        "number": 0,
        "priority": "",
        "typeOfBug": ""
    }
]

var dataThirdSquadList = {
    talentSquadDone: 0,
    talentSeekerAcquisitionSquad: 0,
    talentSquad:'talentSquad',
    talentSeekerAcquisition:'talentSeekerAcquisitionSquad'
}

var dataThirdSquadListJson =[
    {
        "squad": "Talent squad",
        "number": 0,
        "priority": "",
        "typeOfBug": ""
    }, {
        "squad": "Talent seeker acquisition squad",
        "number": 0,
        "priority": "",
        "typeOfBug": ""
    }
]



const listSquads = ['Algorithms squad', 'Applicants acquisition squad', 'Platform squad']/* , 'Genome squad','Work squad', 'Talent squad', 'UGG squad','Talent seeker acquisition squad'] */
const secondListSquads = ['Genome squad', 'UGG squad', 'Work squad']/* , ] */
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
const pull_request = "🧐  Pull request"
const done = "✅   Done"
const optimization_analysis = "🏃 Optimization analysis"
const feature_flag_release = "🚩 Feature flag release"

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





async function requestFunction(squadBody, bugOrDone, priority, typeBug) {
    const resultTemp = await fetch(apiURL, request(body(next_cursor, result_hash_more, squadBody, bugOrDone, priority, typeBug)))
        .then(response => response.json())
        .then(response => { return (response) })



    if (resultTemp.has_more) {
        next_cursor = resultTemp.next_cursor
        result_hash_more = resultTemp.has_more
    } else {
        result_hash_more = resultTemp.has_more
    }


    return resultTemp

}


var result
var trigger = true
function trigger_hash_more(props) {
    if (props) {
        result_hash_more = true
        trigger = true
    } else {
        result_hash_more = false
        next_cursor = ''
    }
}


var result_hash_more = true
var next_cursor = ''
let algorithmsSquad = []
let applicantsAcquisitionSquad = []
let platformSquad = []
let genomeSquadDone = []
let workSquadDone = []
let talentSquadDone = []
let uggSquadDone = []
let talentSeekerAcquisitionSquad = []



var SquadsDone = [algorithmsSquad, applicantsAcquisitionSquad, platformSquad]/* , genomeSquadDone, workSquadDone, talentSquadDone,uggSquadDone,talentSeekerAcquisitionSquad] */
var SquadDoneSecondList = [genomeSquadDone, uggSquadDone, workSquadDone]/* ,workSquadDone,talentSeekerAcquisitionSquad] */
var SquadDoneThirdList = [talentSquadDone, talentSeekerAcquisitionSquad]
const getResults = async (priority, typeBug) => {

    for (let i = 0; i < listSquads.length; i++) {
        trigger_hash_more(true)
        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }
            try{
                result = await requestFunction(listSquads[i], done, priority, typeBug)
            }catch(err){
                console.error(err)
            }
            
            SquadsDone[i] = [...SquadsDone[i], result.results.length]
            console.log(SquadsDone)
            console.log(next_cursor)
            /* counter_result=counter_result+result.results.length; */


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

    dataTemplatejson[0].squad = 'Algorithms squad';
    dataTemplatejson[0].number = counterone;
    dataTemplatejson[0].priority = priority ;
    dataTemplatejson[0].typeOfBug = typeBug ;

    dataTemplatejson[1].squad = 'Applicants acquisition squad';
    dataTemplatejson[1].number = countertwo;
    dataTemplatejson[1].priority = priority ;
    dataTemplatejson[1].typeOfBug = typeBug ;

    dataTemplatejson[2].squad = 'Platform squad';
    dataTemplatejson[2].number = counterthree;
    dataTemplatejson[2].priority = priority ;
    dataTemplatejson[2].typeOfBug = typeBug ;


    /* const obj = Object.assign({}, SquadsDone); */
    fs.writeFile(path.join(__dirname, '../JSONFile/data_AL_AA_PS.json'), JSON.stringify(dataTemplatejson), function (err) {

    })

    algorithmsSquad = []
    applicantsAcquisitionSquad = []
    platformSquad = []
    SquadsDone = [algorithmsSquad, applicantsAcquisitionSquad, platformSquad]
    console.log(234, SquadsDone)
    return JSON.stringify(dataTemplatejson)


}

const getResultsSecondList = async (priority, typeBug) => {


    for (let i = 0; i < secondListSquads.length; i++) {
        trigger_hash_more(true)
        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }

            try{   
                result = await requestFunction(secondListSquads[i], done, priority, typeBug)
            }catch(err){
                console.log(err)
            }
            SquadDoneSecondList[i] = [...SquadDoneSecondList[i], result.results.length]
            console.log(SquadDoneSecondList)
            console.log(next_cursor)
            /* counter_result=counter_result+result.results.length; */


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

    dataSecondSquadListJson[0].squad = 'Genome squad';
    dataSecondSquadListJson[0].number = counterone;
    dataSecondSquadListJson[0].priority = priority ;
    dataSecondSquadListJson[0].typeOfBug = typeBug ;

    dataSecondSquadListJson[1].squad = 'UGG squad';
    dataSecondSquadListJson[1].number = countertwo;
    dataSecondSquadListJson[1].priority = priority ;
    dataSecondSquadListJson[1].typeOfBug = typeBug ;

    dataSecondSquadListJson[2].squad = 'Work squad';
    dataSecondSquadListJson[2].number = counterthree;
    dataSecondSquadListJson[2].priority = priority ;
    dataSecondSquadListJson[2].typeOfBug = typeBug ;
    
    

    dataSecondSquadList['genomeSquadDone'] = counterone;
    dataSecondSquadList['uggSquadDone'] = countertwo;
    dataSecondSquadList['workSquadDone'] = counterthree;
    dataSecondSquadList['genomeSquad'] = 'genomeSquad';
    dataSecondSquadList['uggSquad'] = 'uggSquad';
    dataSecondSquadList['workSquad'] = 'workSquad';

    /* const obj = Object.assign({}, SquadDoneSecondList); */
    fs.writeFile(path.join(__dirname, '../JSONFile/data_G_UGG.json'), JSON.stringify(dataSecondSquadListJson), function (err) {

    })

    genomeSquadDone = []
    uggSquadDone = []
    workSquadDone = []
    SquadDoneSecondList = [genomeSquadDone, uggSquadDone, workSquadDone]
    console.log(234, SquadDoneSecondList)
    return dataSecondSquadListJson

}

const getResultsThirdList = async (priority, typeBug) => {


    for (let i = 0; i < thirdListSquads.length; i++) {
        trigger_hash_more(true)
        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }

            try{
                result = await requestFunction(thirdListSquads[i], done, priority, typeBug)
            }catch(err){
                console.log(err)
            }

            SquadDoneThirdList[i] = [...SquadDoneThirdList[i], result.results.length]
            console.log(SquadDoneThirdList)
            console.log(next_cursor)
            /* counter_result=counter_result+result.results.length; */


        }


    }


    var counterone = 0, countertwo = 0

    for (let i = 0; i < SquadDoneThirdList[0].length; i++) {
        counterone = counterone + SquadDoneThirdList[0][i]
    }

    for (let i = 0; i < SquadDoneThirdList[1].length; i++) {
        countertwo = countertwo + SquadDoneThirdList[1][i]
    }


    console.log(SquadDoneThirdList[0])
    console.log(SquadDoneThirdList[1])

    dataThirdSquadListJson[0].squad = 'Talent squad';
    dataThirdSquadListJson[0].number = counterone;
    dataThirdSquadListJson[0].priority = priority ;
    dataThirdSquadListJson[0].typeOfBug = typeBug ;

    dataThirdSquadListJson[1].squad = 'Talent seeker acquisition squad';
    dataThirdSquadListJson[1].number = countertwo;
    dataThirdSquadListJson[1].priority = priority ;
    dataThirdSquadListJson[1].typeOfBug = typeBug ;


    dataThirdSquadList['talentSquadDone'] = counterone;
    dataThirdSquadList['talentSeekerAcquisitionSquad'] = countertwo;
    dataThirdSquadList['talentSquad']='talentSquad';
    dataThirdSquadList['talentSeekerAcquisition']='talentSeekerAcquisitionSquad';

    /* const obj = Object.assign({}, SquadDoneThirdList); */
    fs.writeFile(path.join(__dirname, '../JSONFile/data_T_TSAS.json'), JSON.stringify(dataThirdSquadList), function (err) {

    })

    talentSquadDone = []
    talentSeekerAcquisitionSquad = []
    SquadDoneThirdList = [talentSquadDone, talentSeekerAcquisitionSquad]
    console.log(234, SquadsDone)
    return dataThirdSquadListJson

}






module.exports = router