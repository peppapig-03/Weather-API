import "./styles.css"
import uiHandler from "./ui.js"
import state from "./state.js"
import eventBus from "./eventBus.js"
const invalidInputLocationName=function(errorString){
    uiHandler.displayError(errorString)
}

const spawnLocationSelectBox=function(){
    const select=uiHandler.spawnSelectBox()
    select.addEventListener("change",(event)=>{
        if (event.target.value=="New Location"){
            eventBus.publish("UI_SELECT_FIRST_OPTION")
        } else{
            eventBus.publish("UI_SELECT_LOCATION", state.getLocationObject(event.target.value))
        } 
    })    
}
const spawnResetButton=function(){
    const button=uiHandler.spawnResetButton()
    button.addEventListener("click", ()=>{
        eventBus.publish("UI_RESET")
    })
}
const renderInitialisation=function(){
    spawnResetButton()
    spawnLocationSelectBox()
}
const run = function () {
    eventBus.subscribe("UI_RESET", state.clearLocationList)
    eventBus.subscribe("UI_RESET", uiHandler.selectFirstOption)
    eventBus.subscribe("STATE_ADD_LOCATION", uiHandler.selectOption)
    eventBus.subscribe("STATE_ADD_LOCATION_ERROR",invalidInputLocationName)
    eventBus.subscribe("UI_SELECT_FIRST_OPTION", uiHandler.spawnNLForm)
    eventBus.subscribe("STATE_UPDATE", uiHandler.updateSelectLocationBox)
    eventBus.subscribe("UI_DELETE_LOCATION", state.deleteLocationObject)
    eventBus.subscribe("STATE_DELETE_LOCATION", uiHandler.selectFirstOption)
    eventBus.subscribe("UI_SELECT_LOCATION", uiHandler.spawnLocationInMain)
    eventBus.subscribe("UI_SUBMIT_NEW_LOCATION", state.addLocationObject)
    renderInitialisation()
    state.initialisation()

}
run()