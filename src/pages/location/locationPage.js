import uiHandler from "./ui.js"
import state from "../../shared/state.js"
import eventBus from "../../shared/eventBus.js"
import "../../shared/styles.css"
const locationPage=(function(){
    const subscriptions=[]
    const spawnLocationSelectBox=function(){
        const select=uiHandler.spawnSelectBox()
        select.addEventListener("change",(event)=>{
            if (event.target.value=="New Location"){
                eventBus.publish("LOCATION_UI_SELECT_FIRST_OPTION")
            } else{
                eventBus.publish("LOCATION_UI_SELECT_LOCATION", state.getLocationObject(event.target.value))
            } 
        })    
    }
    const spawnResetButton=function(){
        const button=uiHandler.spawnResetButton()
        button.addEventListener("click", ()=>{
            eventBus.publish("LOCATION_UI_RESET")
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
        subscriptions.push(eventBus.subscribe("LOCATION_UI_SUBMIT_NEW_LOCATION", state.addLocationObject))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_UPDATE", uiHandler.updateSelectLocationBox))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_ADD_LOCATION", uiHandler.selectOption))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_ADD_LOCATION_ERROR",uiHandler.displayError))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_SELECT_LOCATION", uiHandler.spawnLocationInMain))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_DELETE_LOCATION", state.deleteLocationObject))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_DELETE_LOCATION", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_SELECT_FIRST_OPTION", uiHandler.spawnNLForm))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_RESET", state.clearLocationCollection))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_RESET", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("LOCATION_PAGE_DESPAWN", uiHandler.clearHeader))
        subscriptions.push(eventBus.subscribe("LOCATION_PAGE_DESPAWN", uiHandler.clearMain))
        renderInitialisation()
        state.optionInitialisation()
    }
    const despawn = function (){
        eventBus.publish("LOCATION_PAGE_DESPAWN")
        unsubscribeAll()
    }
    const currentLocations=function(){
        return state.retrieveState().locations
    }
    return {
        spawn,
        currentLocations,
        despawn
    }
})()
export default locationPage