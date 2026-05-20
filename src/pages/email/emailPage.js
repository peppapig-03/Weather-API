/* each email object is going to be 
address and subscriptions to which locations */
import uiHandler from "./ui.js"
import state from "../../shared/state.js"
import eventBus from "../../shared/eventBus.js"
import "../../shared/styles.css"
const emailPage=(function(){
    const subscriptions=[]
    const spawnEmailSelectBox=function(){
        const select=uiHandler.spawnSelectBox()
        select.addEventListener("change",(event)=>{
            if (event.target.value=="New Email"){
                eventBus.publish("EMAIL_UI_SELECT_FIRST_OPTION")
            } else {
                eventBus.publish("EMAIL_UI_SELECT_EMAIL", event.target.value)
            }
        })
    }
    const spawnResetButton=function(){
        const button=uiHandler.spawnResetButton()
        button.addEventListener("click", ()=>{
            eventBus.publish("EMAIL_UI_RESET")
        })
    }
    const renderInitialisation=function(){
        spawnResetButton()
        spawnEmailSelectBox()
    }
    const unsubscribeAll = function(){
        subscriptions.forEach(([eventString, callbackFunction])=>{
            eventBus.unsubscribe(eventString, callbackFunction)
        })
        subscriptions.splice(0)
    }
    const spawn = function () {
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SELECT_FIRST_OPTION", uiHandler.spawnNEForm))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SUBMIT_NEW_EMAIL", state.addEmailObject))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_ADD_EMAIL_ERROR",uiHandler.displayError))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_ADD_EMAIL",uiHandler.selectOption))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_UPDATE", uiHandler.updateSelectEmailBox))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SELECT_EMAIL", state.getEmailObject))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_GET_EMAIL", uiHandler.spawnEmailLocationsInMain))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_DELETE_EMAIL", state.deleteEmailObject))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_DELETE_EMAIL", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_RESET", state.clearEmailCollection))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_RESET", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("EMAIL_PAGE_DESPAWN", uiHandler.clearMain))
        subscriptions.push(eventBus.subscribe("EMAIL_PAGE_DESPAWN", uiHandler.clearHeader))
        renderInitialisation()
        state.optionInitialisation()
    }
    const despawn = function (){
        eventBus.publish("EMAIL_PAGE_DESPAWN")
        unsubscribeAll()
    }
    return {
        spawn,
        despawn
    }
})()
export default emailPage