import { createFullForm , updateSelectBox , clearMain , deKebab , createDeleteLocationButton} from "./utils.js"
const body=document.body
const uiHandler=(function(){
    const header=document.querySelector("header")
    const main=document.querySelector("main")
    const updateSelectLocationBox=function(locationObjectArray/*Array of location Objects*/){
        const selectLocationBoxObject=updateSelectBox(locationObjectArray.map((locationObject)=>{
            return locationObject.originalName
        }))
        return selectLocationBoxObject
    }
    const newLocationInput=function(){
        clearMain()
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
        const submitButton=formObject.submitButton
        submitButton.textContent="Submit"
        return formObject
    }
    const addLocationToMain=function(locationObject){
        clearMain()
        Object.entries(locationObject).forEach(([key,value])=>{
            const div=document.createElement("div")
            div.textContent=`${deKebab(key)} : ${value}`
            div.classList.add("locationInformation")
            main.appendChild(div)
        })
        const button=createDeleteLocationButton()
        main.appendChild(button)
        button.textContent="Delete Location"
        return button
    }
    const displayError=function(errorString){
        alert(errorString)
    }
    const addClearLocationListButton=function(){
        const button=document.createElement("button")
        button.classList.add("clearLocationList")
        header.appendChild(button)
        return button
    }
    return {newLocationInput,
        addLocationToMain,
        displayError,
        updateSelectLocationBox,
        addClearLocationListButton
    }
}())
export default uiHandler