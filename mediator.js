import state from "./state.js"
import uiHandler from "./ui.js"
const mediatorConstructor=function(){
    const mediator={}
    const deleteButton=function(locationObject){
        state.deleteLocation(locationObject)
        uiHandler.update
    }
}