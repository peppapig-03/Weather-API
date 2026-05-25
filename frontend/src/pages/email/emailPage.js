import uiHandler from "./emailUI.js"
import state from "./emailState.js"
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
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_ALERT",uiHandler.uiAlert))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SUBMIT_NEW_EMAIL", state.postEmail))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_UPDATE", uiHandler.updateSelectEmailBox))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_POST_EMAIL",uiHandler.selectOption))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SELECT_EMAIL", uiHandler.spawnEmailButtons))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SELECT_EMAIL", state.getEmailSubscriptions))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_GET_EMAIL_SUBSCRIPTIONS", uiHandler.spawnEmailSubscriptionsInMain))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_DELETE_EMAIL", state.deleteEmail))
        subscriptions.push(eventBus.subscribe("EMAIL_STATE_DELETE_EMAIL", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SELECT_FIRST_OPTION", uiHandler.spawnNEForm))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SUBMIT_NEW_SUBSCRIPTIONS", state.processEmailSubscriptions))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SUBMIT_NEW_SUBSCRIPTIONS", uiHandler.selectFirstOption))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_SENT_EMAIL", state.sendEmail))
        subscriptions.push(eventBus.subscribe("EMAIL_UI_RESET", state.deleteAllEmails))
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