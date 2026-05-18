import state from "./state.js"
import uiHandler from "./ui.js"
const mediator=(function(){
    const deleteObject=function(locationObject){
        state.deleteLocationObject(locationObject)
        uiHandler.updateSelectLocationBox(state.retrieveState())
        uiHandler.selectFirstOption()
    }
    const selectObject=function(selectValue){
        if (selectValue=="New Location"){
            uiHandler.selectFirstOption()
        } else {
            const locationObject=state.getLocationObject(selectValue)
            const button=uiHandler.spawnLocationInMain(locationObject)
            button.addEventListener("click", (event)=>{
                deleteObject(locationObject)
            })
        }
    }
    const NLSubmission=function(event,form){
        event.preventDefault()
        const newLocation=new FormData(form)
        form.reset()
        state.addLocationObject(newLocation.get("newLocation"))
    }
    const reset=function(locationObject){
        state.clearLocationList()
        uiHandler.clearHeader()
    }
    return {deleteObject,
        selectObject,
        NLSubmission,
        reset
    }
})()
export default mediator