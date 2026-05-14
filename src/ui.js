import { createInputBox , createSubmitButton } from "./utils.js"
const body=document.body
const uiHandler=(function(){
    const header=document.querySelector("header")
    const selectBox=function(optionArray){
        const form=document.querySelector("form")
    }
    const newLocationInput=function(){
        const form=document.createElement("form")
        form.id="newLocationForm"
        const appendInputBox=function(parentElement){
            const inputBox=createInputBox()
            const appendLabel=function(parentElement){
                const label=document.createElement("label")
                label.textContent="New Location:"
                label.setAttribute("for","newLocation")
                parentElement.appendChild(label)
            }
            const appendInput=function(parentElement){
                const input=document.createElement("input")
                input.setAttribute("type","text")
                input.id="newLocation"
                input.placeholder="New Location...."
                input.name="newLocation"
                parentElement.appendChild(input)
            }
            appendLabel(inputBox)
            appendInput(inputBox)
            parentElement.append(inputBox)
        }
        const appendInputSubmitButton=function(parentFormElement){
            const button=createSubmitButton()
            parentFormElement.appendChild(button)
        }
        appendInputBox(form)
        appendInputSubmitButton(form)
        header.appendChild(form)
    }

    return {newLocationInput}
}())
export default uiHandler