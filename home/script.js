var url = window.location.href;
const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjdHNUwiLCJzdWIiOiJCU0tYNjciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNzE5NjQ2MDk4LCJpYXQiOjE3MTk1NTk2OTh9.h-xoM7Exm10OMjxjh3HEKTOJdCDe60QkuTHU13wh_Yw"
var stepsjson 
var params = url.substring(37); 
params = params.split("/"); 
console.log(params[0]);
console.log(params[1]);
const username = params[0];
const email = params[1];
var usernameElement = document.getElementById('username');
if (usernameElement) {
    usernameElement.innerHTML = username.toUpperCase()+'!';
} else {
    console.error('Element with id "username" not found.');
}
 
fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json', {
    method: "GET",
    headers: {"Authorization": "Bearer " + access_token}
  })
  .then(response => response.json()) 
  .then(json => console.log(json,getSteps(json))); 
//get the steps from the json 
function getSteps(stepsjson){
    var steps = stepsjson['activities-steps'][0]['value'];
    console.log(steps);
    var stepsElement = document.getElementById('steps');
    if (stepsElement) {
        stepsElement.innerHTML =' Steps: '+steps+'/10,000';
        console.log(updateCircle(0,((steps/10000)*100)))
    } else {
        console.error('Element with id "steps" not found.');
    }
}


function getminutes(minutes){
    var minutes = minutes['activities-active-zone-minutes'][0]['value']['activeZoneMinutes'];
    console.log(minutes);
    var minutesElement = document.getElementById('activemin');
    if (minutesElement) {
        minutesElement.innerHTML =' Active Minutes: '+minutes+' / 30';
        updateCircle(3,((minutes/30)*100))
    } else {
        console.error('Element with id "minutes" not found.');
    }
}
function getSleep(sleep){
    var sleiep = sleep['summary']['totalMinutesAsleep'];
    sleiep = sleiep/60
    console.log(sleiep);
    var sleepElement = document.getElementById('sleeptime');
    if (sleepElement) {
        sleepElement.innerHTML =' Sleep: '+sleiep+' hrs/ 8.0 hrs';
        updateCircle(2,((sleiep/8)*100))
    } else {
        console.error('Element with id "sleep" not found.');
    }
}

function getWater(water){
    var water = water['summary']['water'];
    console.log(water);
    //convert to decimal value
    water = parseFloat(water/1000).toFixed(1);
    var waterElement = document.getElementById('water');
    if (waterElement) {
        waterElement.innerHTML =' Water : '+water+' L / 4L';
        updateCircle(1,((water/4)*100))
    } else {
        console.error('Element with id "water" not found.');
    }

}

fetch('https://api.fitbit.com/1/user/-/activities/active-zone-minutes/date/2024-06-10/1d.json', {
    method: "GET",
    headers: {"Authorization": "Bearer " + access_token}
  })
  .then(response => response.json()) 
  .then(json => console.log(json, getminutes(json))); 
  

  fetch('https://api.fitbit.com/1/user/-/foods/log/water/date/2024-06-27.json', {
    method: "GET",
    headers: {"Authorization": "Bearer " + access_token}
  })
  .then(response => response.json()) 
  .then(json => console.log(json, getWater(json))); 
  


fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2024-06-11.json', {
    method: "GET",
    headers: {"Authorization": "Bearer " + access_token}

  })
  .then(response => response.json()) 
  .then(json => console.log(json, getSleep(json)));   