/* each email object is going to be 
address and subscriptions to which locations */
import uiHandler from "./ui.js"
import state from "../../shared/state.js"
import eventBus from "../../shared/eventBus.js"
import "../../shared/styles.css"
const emailPage=(function(){
    const subscriptions=[]
    const unsubscribeAll = function(){
        subscriptions.forEach(([eventString, callbackFunction])=>{
            eventBus.unsubscribe(eventString, callbackFunction)
        })
        subscriptions.splice(0)
    }
    const spawn = function () {
        alert(111)
    }
    const despawn = function (){
        alert(222)
        unsubscribeAll()
    }

    return {
        spawn,
        despawn
    }
})()
export default emailPage