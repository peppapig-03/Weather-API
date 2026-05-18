import "./styles.css"
import uiHandler from "./ui.js"
import state from "./state.js"
import {despawnForm, addNewLocationToSelectBox} from "./utils.js"
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
    addNewLocationToSelectBox(select)
}
const updateLocationSelectBox=function(stateArray){
    console.log(state.retrieveState())
    const selectObject=uiHandler.updateSelectLocationBox(stateArray)
}
const locationSelectBoxEventHandler=function(event){
    despawnForm()
    const locationObject=state.getSpecificLocationObject(event.target.value)
    addLocationRectangle(locationObject)
}
const locationSelectBoxNewLocationEventHandler=function(){
    spawnNewLocationEventListener()
}
const spawnLocationSelectBoxEventListener = function (){
    const select=document.querySelector("select")
    select.addEventListener("change",(event)=>{
        if (event.target.value=="New Location"){
            locationSelectBoxNewLocationEventHandler()
        } else {
        locationSelectBoxEventHandler(event)
        }
    })    
}
const test=function(input){
    console.log(input)
}
const run = function () {
    spawnLocationSelectBox()
    spawnLocationSelectBoxEventListener()
    locationSelectBoxNewLocationEventHandler()
    state.subscribe("addLocationObjectError",invalidInputLocationName)
    state.subscribe("wholeStateUpdate",updateLocationSelectBox)
    state.initialisation()
}
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