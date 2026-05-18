import { createFullForm , updateSelectBox , clearMain } from "./utils.js"
const body=document.body
const uiHandler=(function(){
    const header=document.querySelector("header")
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
        return formObject
    }
    const addLocationToMain=function(locationObject){
        clearMain()
        const main=document.querySelector("main")
        Object.entries(locationObject).forEach(([key,value])=>{
            const rect=document.createElement("div")
            rect.textContent+=`${key[0].toUpperCase()}${key.slice(1,key.length+1)} : ${value} `
            main.appendChild(rect)
        })
        const rect=document.createElement("div")
        rect.textContent="|||||||||||"
        main.appendChild(rect)
    }
    const displayError=function(errorString){
        alert(errorString)
    }
    return {newLocationInput,
        addLocationToMain,
        displayError,
        updateSelectLocationBox
    }
}())
export default uiHandler