import "./styles.css"
import uiHandler from "./ui.js"
import state from "./state.js"
import {despawnForm, clearHeader , updateSelectBox} from "./utils.js"
const body = document.querySelector("body")
const addLocationRectangle = function (locationObject) {
    uiHandler.addLocationToMain(locationObject)
}
const invalidInputLocationName=function(errorString){
    uiHandler.displayError(errorString)
}
const spawnNewLocationForm = function () {
    const formObject=uiHandler.newLocationInput()
    const formEventListenerHandler=function(form, event){
        event.preventDefault()
        const newLocation=new FormData(form)
        form.reset()
        state.addLocationObject(newLocation.get("newLocation"))
    }
    formObject.form.addEventListener("submit",(event)=>{
        formEventListenerHandler(formObject.form, event)
    })
}
const spawnLocationSelectBox=function(){
    const header=document.querySelector("header")
    const select=document.createElement("select")
    header.appendChild(select)
    updateSelectBox([])
    spawnNewLocationForm()
    const spawnLocationSelectBoxEventListener = function (){
        select.addEventListener("change",(event)=>{
            if (event.target.value=="New Location"){
                spawnNewLocationForm()
            } else {
                locationSelectBoxEventHandler(event)
            }
        })    
    }
    spawnLocationSelectBoxEventListener()
}
const updateLocationSelectBox=function(stateArray){
    console.log(state.retrieveState())
    const selectObject=uiHandler.updateSelectLocationBox(stateArray)
}
const selectLastOption=function(){
    const select=document.querySelector("select")
    select.value=state.retrieveState().at(-1).originalName
    select.dispatchEvent(new Event("change"))
}
const locationSelectBoxEventHandler=function(event){
    despawnForm()
    const locationObject=state.getSpecificLocationObject(event.target.value)
    addLocationRectangle(locationObject)
}
const spawnClearLocationListButton=function(){
    const button=uiHandler.addClearLocationListButton()
    button.textContent="Reset"
    const clearLocationListButtonEventHandler=function(){
        state.clearLocationList()
        clearHeader()
        spawnClearLocationListButton()
        spawnLocationSelectBox()
    }
    button.addEventListener("click", (event)=>{
        clearLocationListButtonEventHandler()
    })
}
const run = function () {
    spawnClearLocationListButton()
    spawnLocationSelectBox()
    state.subscribe("addLocationObjectError",invalidInputLocationName)
    state.subscribe("wholeStateUpdate",updateLocationSelectBox)
    state.subscribe("addLocationObject",selectLastOption)
    state.initialisation()
}
run()
/*
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
}*/