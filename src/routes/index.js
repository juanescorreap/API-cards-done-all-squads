const {Router} = require('express');
const path = require('path')
const fs = require('fs');
const router = Router();

// Routes



router.get('/trigger-al-aa-ps-high', async(req, res) =>{

    
    var results = await getResults();
    res.json(((results)))
    dataTemplate = {
        algorithmsSquad: 0,
        applicantsAcquisitionSquad:0,
        platformSquad:0
    }
})

router.get('/trigger-g-ugg-w-high', async(req, res) =>{

    
    var results = await getResultsSecondList();
    res.json((JSON.stringify(results)))
    dataSecondSquadList = {
        genomeSquadDone: 0,
        uggSquadDone:0,
        workSquadDone:0
    }
})

router.get('/trigger-t-tsas-high', async(req, res) =>{

    
    var results = await getResultsThirdList();
    res.json((JSON.stringify(results)))
    dataThirdSquadList = {
        talentSquadDone: 0,
        talentSeekerAcquisitionSquad:0
    }
})


router.get('/changestate/:text', async(req, res)=>{
    var dataSet= {
        data: ""
    }
    console.log(req.params['text']);
    dataSet['data'] = req.params['text'];
    console.log(dataSet)
    fs.writeFile(path.join(__dirname, '../JSONFile/data_AL_AA_PS.json'), JSON.stringify(dataSet), function(err){
    
});

    res.send(JSON.stringify(dataSet))
})




router.get('/data-al-aa-ps-high', async(req, res)=>{
    let dataSquad;
    fs.readFile(path.join(__dirname, '../JSONFile/data_AL_AA_PS.json'),{encoding:'utf-8'} , (err, jsonString) =>{
        if(err){
        }else{
            dataSquad=jsonString;     
            res.json(JSON.parse(dataSquad));
        }
    })
})

router.get('/data-g-ugg-w-high', async(req, res)=>{
    let dataSquad;
    fs.readFile(path.join(__dirname, '../JSONFile/data_G_UGG.json'),{encoding:'utf-8'} , (err, jsonString) =>{
        if(err){
        }else{
            dataSquad=jsonString;     
            res.json(JSON.parse(dataSquad));
        }
    })
})

router.get('/data-t-tsas-high', async(req, res)=>{
    let dataSquad;
    fs.readFile(path.join(__dirname, '../JSONFile/data_T_TSAS.json'),{encoding:'utf-8'} , (err, jsonString) =>{
        if(err){
        }else{
            dataSquad=jsonString;     
            res.json(JSON.parse(dataSquad));
        }
    })
})



///Code


const fetch = require('node-fetch');
const { json } = require('express/lib/response')

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query";

var dataTemplate = {
    algorithmsSquad: 0,
    applicantsAcquisitionSquad:0,
    platformSquad:0
}

var dataSecondSquadList = {
    genomeSquadDone: 0,
    uggSquadDone:0,
    workSquadDone:0
}

var dataThirdSquadList = {
    talentSquadDone: 0,
    talentSeekerAcquisitionSquad:0
}



const listSquads = ['Algorithms squad','Applicants acquisition squad','Platform squad']/* , 'Genome squad','Work squad', 'Talent squad', 'UGG squad','Talent seeker acquisition squad'] */
const secondListSquads = ['Genome squad','UGG squad','Work squad']/* , ] */
const thirdListSquads = ['Talent squad','Talent seeker acquisition squad']


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
                },{
                    "property":"Priority",
                    "select":{
                        "equals" : "Medium"
                    }
                },{
                    "property":"Other labels",
                        "multi_select":{
                            "contains" : "Bug"
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
                },{
                    "property":"Priority",
                    "select":{
                        "equals" : "Medium"
                    }
                },{
                    "property":"Other labels",
                        "multi_select":{
                            "contains" : "Bug"
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
    const resultTemp = await fetch(apiURL, request(body(next_cursor,result_hash_more,squadBody,bugOrDone)))
        .then(response => response.json())
        .then(response => { return (response) })

         

        if (resultTemp.has_more) {
            next_cursor = resultTemp.next_cursor
            result_hash_more = resultTemp.has_more
        } else {
            result_hash_more = resultTemp.has_more
        }


    return resultTemp;

}


var result
var trigger = true
function trigger_hash_more(props){
    if (props) {
        result_hash_more = true
        trigger = true
    } else {
        result_hash_more = false
        next_cursor=''
    }
}


var result_hash_more = true
var next_cursor = ''
let algorithmsSquad=[];
let applicantsAcquisitionSquad = []
let platformSquad=[];
let genomeSquadDone = [];
let workSquadDone = [];
let talentSquadDone = [];
let uggSquadDone = [];
let talentSeekerAcquisitionSquad=[];


var SquadsDone = [algorithmsSquad, applicantsAcquisitionSquad, platformSquad]/* , genomeSquadDone, workSquadDone, talentSquadDone,uggSquadDone,talentSeekerAcquisitionSquad] */
var SquadDoneSecondList = [genomeSquadDone, uggSquadDone,workSquadDone]/* ,workSquadDone,talentSeekerAcquisitionSquad] */
var SquadDoneThirdList = [talentSquadDone, talentSeekerAcquisitionSquad]
const getResults = async() =>{

    for (let i = 0; i < listSquads.length; i++) {
        trigger_hash_more(true);
        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }
            result = await requestFunction(listSquads[i], done)
            SquadsDone[i] = [...SquadsDone[i], result.results.length]
            console.log(SquadsDone)
            console.log(next_cursor)
            /* counter_result=counter_result+result.results.length; */

    
        }


    }


    var counterone=0, countertwo=0, counterthree=0;

    for(let i=0; i < SquadsDone[0].length; i++){
        counterone = counterone + SquadsDone[0][i];
    }

    for(let i=0; i < SquadsDone[1].length; i++){
        countertwo = countertwo + SquadsDone[1][i];
    }

    for(let i=0; i < SquadsDone[2].length; i++){
        counterthree = counterthree + SquadsDone[2][i];
    }

    console.log(SquadsDone[0]);
    console.log(SquadsDone[1]);
    console.log(SquadsDone[2]);

    dataTemplate['algorithmsSquad'] = counterone;
    dataTemplate['applicantsAcquisitionSquad']= countertwo;
    dataTemplate['platformSquad']=counterthree;
    /* const obj = Object.assign({}, SquadsDone); */
    fs.writeFile(path.join(__dirname, '../JSONFile/data_AL_AA_PS.json'), JSON.stringify(dataTemplate), function(err){

    });

    algorithmsSquad=[];
    applicantsAcquisitionSquad = []
    platformSquad=[];
    SquadsDone=[algorithmsSquad, applicantsAcquisitionSquad, platformSquad]
    console.log(234, SquadsDone)
    return dataTemplate;

    
}

const getResultsSecondList = async() =>{


    for (let i = 0; i < secondListSquads.length; i++) {
        trigger_hash_more(true);
        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }
            result = await requestFunction(secondListSquads[i], done)
            SquadDoneSecondList[i] = [...SquadDoneSecondList[i], result.results.length]
            console.log(SquadDoneSecondList)
            console.log(next_cursor)
            /* counter_result=counter_result+result.results.length; */

    
        }


    }


    var counterone=0, countertwo=0, counterthree=0;

    for(let i=0; i < SquadDoneSecondList[0].length; i++){
        counterone = counterone + SquadDoneSecondList[0][i];
    }

    for(let i=0; i < SquadDoneSecondList[1].length; i++){
        countertwo = countertwo + SquadDoneSecondList[1][i];
    }

    for(let i=0; i < SquadDoneSecondList[2].length; i++){
        counterthree = counterthree + SquadDoneSecondList[2][i];
    }
    console.log(SquadDoneSecondList[0]);
    console.log(SquadDoneSecondList[1]);
    console.log(SquadDoneSecondList[2]);

    dataSecondSquadList['genomeSquadDone'] = counterone;
    dataSecondSquadList['uggSquadDone']= countertwo;
    dataSecondSquadList['workSquadDone']=counterthree;
    
    /* const obj = Object.assign({}, SquadDoneSecondList); */
    fs.writeFile(path.join(__dirname, '../JSONFile/data_G_UGG.json'), JSON.stringify(dataSecondSquadList), function(err){

    });

    genomeSquadDone=[];
    uggSquadDone = []
    workSquadDone=[];
    SquadDoneSecondList=[genomeSquadDone, uggSquadDone, workSquadDone]
    console.log(234, SquadDoneSecondList)
    return dataSecondSquadList;
    
}

const getResultsThirdList = async() =>{


    for (let i = 0; i < thirdListSquads.length; i++) {
        trigger_hash_more(true);
        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }
            result = await requestFunction(thirdListSquads[i], done)
            SquadDoneThirdList[i] = [...SquadDoneThirdList[i], result.results.length]
            console.log(SquadDoneThirdList)
            console.log(next_cursor)
            /* counter_result=counter_result+result.results.length; */

    
        }


    }


    var counterone=0, countertwo=0;

    for(let i=0; i < SquadDoneThirdList[0].length; i++){
        counterone = counterone + SquadDoneThirdList[0][i];
    }

    for(let i=0; i < SquadDoneThirdList[1].length; i++){
        countertwo = countertwo + SquadDoneThirdList[1][i];
    }


    console.log(SquadDoneThirdList[0]);
    console.log(SquadDoneThirdList[1]);

    dataThirdSquadList['talentSquadDone'] = counterone;
    dataThirdSquadList['talentSeekerAcquisitionSquad']= countertwo;
    
    /* const obj = Object.assign({}, SquadDoneThirdList); */
    fs.writeFile(path.join(__dirname, '../JSONFile/data_T_TSAS.json'), JSON.stringify(dataThirdSquadList), function(err){

    });

    talentSquadDone=[];
    talentSeekerAcquisitionSquad = []
    SquadDoneThirdList=[talentSquadDone, talentSeekerAcquisitionSquad]
    console.log(234, SquadsDone)
    return dataThirdSquadList;
    
}






module.exports = router;