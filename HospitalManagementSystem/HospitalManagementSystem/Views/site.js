var MAXIMUM_SLOTS = 16;
var startingSlotHour = 9
var slotDurationInMinutes = 30

$(document).ready(function() {
    initializeSchedulerTable();

});

function callApi(method, url,data, successHandler, errorHandler){
    $.ajax({
        type: method,
        url: url,
        contentType: "application/json; charset=utf-8",
        data: data,
        success: successHandler,
        error: errorHandler
    });
}

function getDetailsForDay(day){
    let pickedDate = $("#datepicker").val().split("-");
    let actualDate = new Date(pickedDate[0], pickedDate[1], pickedDate[2]).toISOString();
    let data = getMock();
    enterDetailsInTable(data);
}

function bookSlot(index){
    let time = incrementSlotAndGetTime(initSlots(), index*slotDurationInMinutes)
    alert("Book slot for time:" + time + " ?");
}

function enterDetailsInTable(data){
    let table = $("#schedulerTable");
    $('#schedulerTable > tr:not(:first)').remove();
    let contentString = "";
    for(let d of data){
        contentString += "<tr><td>" + d["doctorName"] + "(" +d["speciality"] + ")" + "</td>";
        let index = 0;
        for(let t of d["times"]){
            if(t == 1){
                contentString += "<td class='alert-danger'></td>"
            }
            else{
                let functionToCall = "bookSlot(" + index+ ")";
                contentString += "<td><button class='btn btn-primary' onclick=" + functionToCall + ">B</span></button></td>"
            }
            index++;
        }
        contentString += "</tr>";
    }
    table.append(contentString);
}

function getMock(){
    var data = [{"doctorName":"Mathi", "times":[0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0], "speciality":"Cardiologist"},
    {"doctorName":"Rathi", "times":[1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,0,0], "speciality":"Surgeon"}];
    return data;
}

function initializeSchedulerTable(){
    let startTime = initSlots();
    let table = $("#schedulerTable");
    let headerString = "<tr><th>Doctor</th>";
    headerString += "<th>" + incrementSlotAndGetTime(startTime, 0) + "</th>"
    for(let i = 0; i < MAXIMUM_SLOTS; i++){
        headerString += "<th>" + incrementSlotAndGetTime(startTime, slotDurationInMinutes) + "</th>"
    }
    headerString += "</tr>";
    table.append(headerString);
}

function initSlots(){
    let date = new Date();
    date.setHours(startingSlotHour);
    date.setMinutes(0);
    return date;
}

function incrementSlotAndGetTime(date, minutes){
    date.setTime(date.getTime() + 60*minutes*1000);
    return date.getHours() + ":" + date.getMinutes();
}


