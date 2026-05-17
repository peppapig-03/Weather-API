import { createInputBox , createSubmitButton , createFullForm} from "./utils.js"
const body=document.body
const uiHandler=(function(){
    const header=document.querySelector("header")
    const selectBox=function(optionArray){
        const form=document.querySelector("form")
    }
    const newLocationInput=function(){
        const formObject=createFullForm()
        const form=formObject.form
        form.id="newLocationForm"
        const label=formObject.label
        label.textContent="New Location:"
        label.setAttribute("for","newLocation")
        const input=formObject.input
        input.setAttribute("type","text")
        input.id="newLocation"
        input.placeholder="New Location..."
        input.name="newLocation"
        return formObject
    }
    const addTextRectangle=function(){
        const main=document.querySelector("main")
        const rect=document.createElement("div")
        rect.textContent="TESTTEST"
        main.appendChild(rect)
    }

    return {newLocationInput,
        addTextRectangle
    }
}())
export default uiHandler