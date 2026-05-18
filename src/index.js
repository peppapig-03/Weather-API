import "./styles.css"
import uiHandler from "./ui.js"
import state from "./state.js"
import eventBus from "./eventBus.js"
import mediator from "./mediator.js"
const invalidInputLocationName=function(errorString){
    uiHandler.displayError(errorString)
}
const spawnNewLocationForm = function () {
    const form=uiHandler.spawnNLForm()
    form.addEventListener("submit",(event)=>{
        mediator.NLSubmission(event, form)
    })
}
const spawnLocationSelectBox=function(){
    const select=uiHandler.spawnSelectBox()
    select.addEventListener("change",(event)=>{
        mediator.selectObject(event.target.value)
    })    
}
const updateLocationSelectBox=function(stateArray){
    uiHandler.updateSelectLocationBox(stateArray)
}
const spawnResetButton=function(){
    const button=uiHandler.spawnResetButton()
    button.addEventListener("click", (event)=>{
        mediator.reset()
        spawnResetButton()
        spawnLocationSelectBox()
    })
}
const run = function () {
    eventBus.subscribe("addLocationObject", uiHandler.selectLastOption)
    eventBus.subscribe("addLocationObjectError",invalidInputLocationName)
    eventBus.subscribe("selectFirstOption", spawnNewLocationForm)
    eventBus.subscribe("selectBoxChange", updateLocationSelectBox)
    spawnResetButton()
    spawnLocationSelectBox()
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