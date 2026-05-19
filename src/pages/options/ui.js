/*NL=New Location*/
import utils from "../../utils/utils.js"
import eventBus from "../../shared/eventBus.js"
import uiCreation from "./uiCreation.js"
const uiHandler=(function(){
    const header=document.querySelector("header")
    const main=document.querySelector("main")
    let formPresent=false
    const removeForm=function(){
        try{
            const form=document.querySelector("form")
            header.removeChild(form)
            formPresent=false            
        } catch{
            return
        }
    }
    const clearMain=function(){
        while (main.firstElementChild){
            main.removeChild(main.lastElementChild)
        }
    }
    const clearHeader=function(){
        while (header.firstElementChild){
            header.removeChild(header.lastElementChild)
        }
        formPresent=false
    }
    const spawnSelectBox=function(){
        const select=document.createElement("select")
        header.appendChild(select)
        addNewLocationToSelectBox(select)
        selectFirstOption()
        return select
    }
    const clearSelectBox=function(selectBox){
        while(selectBox.firstElementChild){
            selectBox.removeChild(selectBox.lastElementChild)
        }
    }
    const addNewLocationToSelectBox=function(selectBox){
        const option=document.createElement("option")
        option.value="New Location"
        option.textContent="New Location"
        selectBox.appendChild(option)
    }
    const updateSelectLocationBox=function(locationObjectArray/*Array of location Objects*/){
        const select=document.querySelector("select")
        clearSelectBox(select)
        addNewLocationToSelectBox(select)
        locationObjectArray.forEach((locationObject)=>{
            const locationName=locationObject.originalName
            const option=document.createElement("option")
            option.value=locationName
            option.textContent=locationName
            select.appendChild(option)
        })
    }
    const spawnNLForm=function(){
        if (formPresent==false){
            clearMain()
            const {form,
                label,
                input,
                submitButton
            }=uiCreation.createFullForm()
            header.appendChild(form)
            form.id="newLocationForm"
            label.textContent="New Location:"
            label.setAttribute("for","newLocation")
            input.setAttribute("type","text")
            input.id="newLocation"
            input.placeholder="New Location..."
            input.name="newLocation"
            submitButton.textContent="Submit"
            form.addEventListener("submit",(event)=>{
                event.preventDefault()
                const newLocation=new FormData(form)
                form.reset()
                eventBus.publish("UI_SUBMIT_NEW_LOCATION",newLocation.get("newLocation"))
            })
            formPresent=true
        }
    }
    const spawnLocationInMain=function(locationObject){
        clearMain()
        removeForm()
        Object.entries(locationObject).forEach(([key,value])=>{
            const div=document.createElement("div")
            div.textContent=`${utils.deKebab(key)} : ${value}`
            div.classList.add("locationInformation")
            main.appendChild(div)
        })
        const button=uiCreation.createDeleteLocationButton()
        main.appendChild(button)
        button.textContent="Delete Location"
        button.addEventListener("click",(event)=>{
            eventBus.publish("UI_DELETE_LOCATION", locationObject)
        })
    }
    const displayError=function(errorString){
        alert(errorString)
    }
    const spawnResetButton=function(){
        const button=document.createElement("button")
        button.classList.add("clearLocationList")
        header.appendChild(button)
        button.textContent="Reset"
        return button
    }
    const selectFirstOption=function(){
        const select=document.querySelector("select")
        if (document.querySelector("form")!==null){
            return
        } else {
            select.value=select.firstElementChild.textContent
            eventBus.publish("UI_SELECT_FIRST_OPTION", select.value)
        }
    }
    const selectOption=function(locationObject){
        const select=document.querySelector("select")
        select.value=locationObject.originalName
        spawnLocationInMain(locationObject)
    }   
    return {
        clearMain,
        clearHeader,
        spawnSelectBox,
        updateSelectLocationBox,
        spawnNLForm,
        spawnLocationInMain,
        displayError,
        spawnResetButton,
        selectFirstOption,
        selectOption
    }
}())
export default uiHandler