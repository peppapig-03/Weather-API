/*New Task: addEventListener to comboBox
such that when it chooses new item the form pops up
if not then main displays information*/


import "./styles.css"
import uiHandler from "./ui.js"
import state from "./state.js"
const body = document.querySelector("body")
const formEventListenerHandler=function(form, event){
    event.preventDefault()
    const newLocation=new FormData(form)
    form.reset()
    state.addLocationObject(newLocation.get("newLocation"))
}
const spawnNewLocationEventListener = function () {
    const formObject=uiHandler.newLocationInput()
    formObject.form.addEventListener("submit",(event)=>{
        formEventListenerHandler(formObject.form, event)
    })
}
const addLocationRectangle = function (locationObject) {
    uiHandler.addLocationToMain(locationObject)
}
const invalidInputLocationName=function(errorString){
    uiHandler.displayError(errorString)
}
const spawnLocationSelectBox=function(){
    const header=document.querySelector("header")
    const select=document.createElement("select")
    header.appendChild(select)
}
const updateLocationSelectBox=function(stateArray){
    console.log(state.retrieveState())
    const selectObject=uiHandler.updateSelectLocationBox(stateArray)
}
const spawnLocationSelectBoxEventListener = function (){
    const select=document.querySelector("select")

    
}
const run = function () {
    spawnLocationSelectBox()
    spawnNewLocationEventListener()
    state.subscribe("addLocationObject",addLocationRectangle)
    state.subscribe("addLocationObjectError",invalidInputLocationName)
    state.subscribe("wholeStateUpdate",updateLocationSelectBox)
}
state.addLocationObject("Penang")
state.addLocationObject("Melaka")
state.addLocationObject("Shah Alam")
run()
const getPosition=function(){
    return new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition(resolve,reject)
    })
}
const asyncPosition= async function(){
    try{
    const position=await getPosition()
    console.log(position)
    console.log("success")
    } catch(error){
        console.log(error)
    }
}