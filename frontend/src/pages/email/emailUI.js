/*NE refers to New Email*/
import eventBus from "../../shared/eventBus.js"
import uiCreation from "../../shared/uiCreation.js"
const uiHandler=(function(){
    const header=document.querySelector("header")
    const main=document.querySelector("main")
    let formPresent=false
    let emailButtonsPresent=false
    const removeForm=function(){
        try{
            const form=document.querySelector("form")
            header.removeChild(form)
            formPresent=false
        } catch(error){
            return
        }
    }
    const removeHeaderButtons=function(){
        if (emailButtonsPresent==true){
            const buttonList=header.querySelectorAll(".headerButton")
            buttonList.forEach((button)=>{
                header.removeChild(button)
            })
            emailButtonsPresent=false
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
        formPresent=false
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
    const updateSelectEmailBox=function(emailAddressArray){
        const select=document.querySelector("select")
        clearSelectBox(select)
        addNewEmailToSelectBox(select)
        emailAddressArray.forEach((emailAddress)=>{
            const option=document.createElement("option")
            option.value=emailAddress
            option.textContent=emailAddress
            select.appendChild(option)
        })
    }
    const spawnNEForm=function(){
        removeHeaderButtons()
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
            input.setAttribute("type","email")
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
    const spawnEmailSubscriptionsInMain=function(emailObject){
        clearMain()
        removeForm()
        const emailAddress=emailObject["emailAddress"]
        const subbed=emailObject["subscribedLocations"]
        const locationList=emailObject["allLocations"]
        const form=uiCreation.createMainForm()
        main.appendChild(form)
        locationList.forEach((locationName)=>{
            const {box, checkBox}=uiCreation.createCheckBox(locationName)
            form.appendChild(box)
            if (subbed.includes(locationName)){
                checkBox.checked=true
            } else{
                checkBox.checked=false
            }
        })
        const submitButton=uiCreation.createMainSubmitButton()
        submitButton.textContent="Submit Changes"
        form.appendChild(submitButton)
        submitButton.addEventListener("click",(event)=>{
            event.preventDefault()
            const rawSubscriptionData=new FormData(form)
            const subscriptionData={
                "emailAddress":emailAddress,
                "oldSubscribedLocations":subbed,
                "newSubscribedLocations":[]
            }
            for (const[location,value] of rawSubscriptionData){
                subscriptionData["newSubscribedLocations"].push(location)
            }
            eventBus.publish("EMAIL_UI_SUBMIT_NEW_SUBSCRIPTIONS", subscriptionData)
        })
    }
    const uiAlert=function(alertString){
        alert(alertString)
    }
    const spawnResetButton=function(){
        const button=document.createElement("button")
        button.classList.add("resetButton")
        header.appendChild(button)
        button.textContent="Reset"
        return button
    }
    const spawnEmailButtons=function(emailAddress){
        removeHeaderButtons()
        const emailButton=uiCreation.createHeaderButton()
        header.appendChild(emailButton)
        emailButton.textContent=`Test email`
        const deleteButton=uiCreation.createHeaderButton()
        header.appendChild(deleteButton)
        deleteButton.textContent=`Delete email`
        deleteButton.addEventListener(("click"),(event)=>{
            eventBus.publish("EMAIL_UI_DELETE_EMAIL", emailAddress)
        })
        emailButtonsPresent=true
    }
    const selectFirstOption=function(){
        const select=document.querySelector("select")
        select.value=select.firstElementChild.textContent
        eventBus.publish("EMAIL_UI_SELECT_FIRST_OPTION", select.value)
    }
    const selectOption=function(emailAddress){
        const select=document.querySelector("select")
        select.value=emailAddress
        eventBus.publish("EMAIL_UI_SELECT_EMAIL", emailAddress)
    }
    return {
        spawnSelectBox,
        spawnNEForm,
        uiAlert,
        selectOption,
        updateSelectEmailBox,
        spawnEmailSubscriptionsInMain,
        selectFirstOption,
        spawnResetButton,
        spawnEmailButtons,
        clearHeader,
        clearMain
    }
})()
export default uiHandler