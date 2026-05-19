import uiHandler from "./ui.js"
import state from "../../shared/state.js"
import eventBus from "../../shared/eventBus.js"
const optionPage=(function(){
    const subscriptions=[]
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
    const unsubscribeAll = function(){
        subscriptions.forEach(([eventString, callbackFunction])=>{
            eventBus.unsubscribe(eventString, callbackFunction)
        })
        subscriptions.splice(0)
    }
    const spawn = function () {
        subscriptions.push(eventBus.subscribe("UI_RESET", state.clearLocationList))
        subscriptions.push(eventBus.subscribe("UI_RESET", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("STATE_ADD_LOCATION", uiHandler.selectOption))
        subscriptions.push(eventBus.subscribe("STATE_ADD_LOCATION_ERROR",uiHandler.displayError))
        subscriptions.push(eventBus.subscribe("UI_SELECT_FIRST_OPTION", uiHandler.spawnNLForm))
        subscriptions.push(eventBus.subscribe("STATE_UPDATE", uiHandler.updateSelectLocationBox))
        subscriptions.push(eventBus.subscribe("UI_DELETE_LOCATION", state.deleteLocationObject))
        subscriptions.push(eventBus.subscribe("STATE_DELETE_LOCATION", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("UI_SELECT_LOCATION", uiHandler.spawnLocationInMain))
        subscriptions.push(eventBus.subscribe("UI_SUBMIT_NEW_LOCATION", state.addLocationObject))
        subscriptions.push(eventBus.subscribe("OPTION_PAGE_DESPAWN", uiHandler.clearHeader))
        subscriptions.push(eventBus.subscribe("OPTION_PAGE_DESPAWN", uiHandler.clearMain))
        renderInitialisation()
        state.initialisation()
    }
    const despawn = function (){
        eventBus.publish("OPTION_PAGE_DESPAWN")
        unsubscribeAll()
    }
    const currentLocations=function(){
        return state.retrieveState()
    }
    return {
        spawn,
        currentLocations,
        despawn
    }
})()
export default optionPage