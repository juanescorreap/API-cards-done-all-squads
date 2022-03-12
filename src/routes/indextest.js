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








