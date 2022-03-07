const {Router} = require('express');
const path = require('path')
const fs = require('fs');
const router = Router();

router.get('/changestate/:text', async(req, res)=>{
    var dataSet= {
        data: ""
    }
    console.log(req.params['text']);
    dataSet['data'] = req.params['text'];
    console.log(dataSet)
    fs.writeFile(path.join(__dirname, '../JSONFile/data.json'), JSON.stringify(dataSet), function(err){
    
});
})

router.get('/trigger', async(req, res) =>{

    
    var results = await getResults();
    res.json((JSON.stringify(results)))
})

router.get('/data', async(req, res)=>{
    let dataSquad;
    fs.readFile(path.join(__dirname, '../JSONFile/data.json'),{encoding:'utf-8'} , (err, jsonString) =>{
        if(err){
        }else{
            dataSquad=jsonString;    
/*             console.log(2000,dataSquad)
            console.log(3000,typeof(dataSquad)); */  
            res.json((JSON.parse(dataSquad)));
        }
    })



})


const fetch = require('node-fetch');
const { json } = require('express/lib/response')

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query";



const listSquads = ['Algorithms squad','Applicants acquisition squad','Platform squad', 'Genome squad','Work squad', 'Talent squad', 'UGG squad','Talent seeker acquisition squad']


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


var SquadsDone = [algorithmsSquad, applicantsAcquisitionSquad, platformSquad, genomeSquadDone, workSquadDone, talentSquadDone,uggSquadDone,talentSeekerAcquisitionSquad]


const getResults = async() =>{
    var counter_result=0;
    /* result = await requestFunction(listSquads[0], done) */

        while (result_hash_more != false) {
            if (trigger) {
                trigger_hash_more(false)
                trigger = false
            }
            result = await requestFunction(listSquads[0], done)
            SquadsDone[0] = [...SquadsDone[0], result.results.length]
            counter_result=counter_result+result.results.length;
    
        }
    const obj = Object.assign({}, SquadsDone);
    fs.writeFile(path.join(__dirname, '../JSONFile/data.json'), JSON.stringify(obj), function(err){
            /* console.log('Completed JSON file') */
    });


/*     console.log(100,counter_result);
    console.log(200,result.results.length);
    console.log('result_hash_more: ',result_hash_more);
    console.log('var next_cursor: ', next_cursor)
    next_cursor='';
    result_hash_more=true;
    trigger=true;
 */
    return SquadsDone;
    
}





module.exports = router;