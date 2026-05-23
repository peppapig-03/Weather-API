import uiHandler from "./locationUI.js"
import state from "./locationState.js"
import eventBus from "../../shared/eventBus.js"
import "../../shared/styles.css"
const locationPage = (function () {
    const subscriptions = []
    let present=false
    const spawnLocationSelectBox = function () {
        const select = uiHandler.spawnSelectBox()
        select.addEventListener("change", (event) => {
            if (event.target.value == "New Location") {
                eventBus.publish("LOCATION_UI_SELECT_FIRST_OPTION")
            } else {
                eventBus.publish("LOCATION_UI_SELECT_LOCATION", event.target.value)
            }
        })
    }
    const spawnResetButton = function () {
        const button = uiHandler.spawnResetButton()
        button.addEventListener("click", () => {
            eventBus.publish("LOCATION_UI_RESET")
        })
    }
    const renderInitialisation = function () {
        spawnResetButton()
        spawnLocationSelectBox()
    }
    const unsubscribeAll = function () {
        subscriptions.forEach(([eventString, callbackFunction]) => {
            eventBus.unsubscribe(eventString, callbackFunction)
        })
        subscriptions.splice(0)
    }
    const spawn = function () {
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_ALERT", uiHandler.uiAlert))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_SUBMIT_NEW_LOCATION", state.postLocation))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_UPDATE", uiHandler.updateSelectLocationBox))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_POST_LOCATION", uiHandler.selectOption))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_SELECT_LOCATION", state.getLocationObject))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_GET_LOCATION_OBJECT", uiHandler.spawnLocationInMain))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_DELETE_LOCATION", state.deleteLocation))  
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_DELETE_SUCCESS", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_SELECT_FIRST_OPTION", uiHandler.spawnNLForm))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_REFRESH_LOCATION", state.refreshLocationObject))
        subscriptions.push(eventBus.subscribe("LOCATION_STATE_REFRESH_LOCATION", uiHandler.selectOption))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_RESET", state.deleteAllLocations))
        subscriptions.push(eventBus.subscribe("LOCATION_UI_RESET", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("LOCATION_PAGE_DESPAWN", uiHandler.clearHeader))
        subscriptions.push(eventBus.subscribe("LOCATION_PAGE_DESPAWN", uiHandler.clearMain))
        renderInitialisation()
        state.optionInitialisation()
        present=true
    }
    const despawn = function () {
        eventBus.publish("LOCATION_PAGE_DESPAWN")
        unsubscribeAll()
        present=false
    }
    const currentLocations = function () {
        return state.retrieveState()
    }
    const presence=function(){
        return present
    }
    return {
        spawn,
        currentLocations,
        despawn,
        presence
    }
})()
export default locationPage