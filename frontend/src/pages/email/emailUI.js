/*NE refers to New Email*/
import eventBus from "../../shared/eventBus.js"
import uiCreation from "../../shared/uiCreation.js"
const uiHandler=(function(){
    const header=document.querySelector("header")
    const main=document.querySelector("main")
    let formPresent=false
    const removeForm=function(){
        try{
            const form=document.querySelector("form")
            header.removeChild(form)
            formPresent=false
        } catch(error){
            return
        }
    }
    const clearMain=function(){
        while(main.firstElementChild){
            main.removeChild(main.lastElementChild)
        }
    }
    const clearHeader=function(){
        while (header.firstElementChild){
            header.removeChild(header.lastElementChild)
        }
    }
    const spawnSelectBox=function(){
        const select=document.createElement("select")
        header.appendChild(select)
        addNewEmailToSelectBox(select)
        selectFirstOption()
        return select
    }
    const clearSelectBox=function(selectBox){
        while(selectBox.firstElementChild){
            selectBox.removeChild(selectBox.lastElementChild)
        }
    }
    const addNewEmailToSelectBox=function(selectBox){
        const option=document.createElement("option")
        option.value="New Email"
        option.textContent="New Email"
        selectBox.appendChild(option)
    }
    const updateSelectEmailBox=function(emailObjectArray/*Array of email Objects*/){
        const select=document.querySelector("select")
        clearSelectBox(select)
        addNewEmailToSelectBox(select)
        emailObjectArray.forEach((emailObject)=>{
            const option=document.createElement("option")
            option.value=emailObject["UUID"]
            option.textContent=emailObject.address
            select.appendChild(option)
        })
    }
    const spawnNEForm=function(){
        if (formPresent==false){
            clearMain()
            const {form,
                label,
                input,
                submitButton
            }=uiCreation.createFullForm()
            header.appendChild(form)
            form.id="newEmailForm"
            label.textContent="New Email:"
            label.setAttribute("for","newEmail")
            input.setAttribute("type","text")
            input.id="newEmail"
            input.placeholder="New Email..."
            input.name="newEmail"
            submitButton.textContent="Submit"
            form.addEventListener("submit",(event)=>{
                event.preventDefault()
                const newEmail=new FormData(form)
                form.reset()
                eventBus.publish("EMAIL_UI_SUBMIT_NEW_EMAIL",newEmail.get("newEmail"))
            })
            formPresent=true
        }
    }
    const spawnEmailLocationsInMain=function(emailObject, locationList){
        clearMain()
        removeForm()
        const {address, emailLocationsUUID}=emailObject
        locationList.forEach((locationObject)=>{
            const div=document.createElement("div")
            div.textContent=`${locationObject.originalName} : `
            div.classList.add("locationInformation")
            main.appendChild(div)
            if (emailLocationsUUID.includes(locationObject["UUID"])){
                div.textContent+=`Subscribed by ${address}`
            } else{
                div.textContent+=`Not Subscribed`
            }
        })
        const button=uiCreation.createDeleteButton()
        main.appendChild(button)
        button.textContent="Delete Email"
        button.addEventListener("click",()=>{
            eventBus.publish("EMAIL_UI_DELETE_EMAIL", emailObject["UUID"])
        })
    }
    const displayError=function(errorString){
        alert(errorString)
    }
    const spawnResetButton=function(){
        const button=document.createElement("button")
        button.classList.add("resetButton")
        header.appendChild(button)
        button.textContent="Reset"
        return button
    }
    const selectFirstOption=function(){
        const select=document.querySelector("select")
        select.value=select.firstElementChild.textContent
        eventBus.publish("EMAIL_UI_SELECT_FIRST_OPTION", select.value)
    }
    const selectOption=function(emailObject){
        const select=document.querySelector("select")
        select.value=emailObject["UUID"]
        eventBus.publish("EMAIL_UI_SELECT_EMAIL", emailObject["UUID"])
    }
    return {
        spawnSelectBox,
        spawnNEForm,
        displayError,
        selectOption,
        updateSelectEmailBox,
        spawnEmailLocationsInMain,
        selectFirstOption,
        spawnResetButton,
        clearHeader,
        clearMain
    }
})()
export default uiHandler