/*NE refers to New Email*/
import utils from "../../utils/utils.js"
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
/*###*/        selectFirstOption()
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
    const updateSelectLocationBox=function(emailObjectArray/*Array of email Objects*/){
        const select=document.querySelector("select")
        clearSelectBox(select)
        addNewEmailToSelectBox(select)
        emailObjectArray.forEach((emailObject)=>{
            const option=document.createElement("option")
            const email=emailObject.address
            option.value=email
            option.textContent=email
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
                const newLocation=new FormData(form)
                form.reset()
/*                eventBus.publish("OPTION_UI_SUBMIT_NEW_LOCATION",newLocation.get("newLocation"))
*/            })
            formPresent=true
        }
    }
    const spawnEmailLocationsInMain=function(locationObject){
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
            eventBus.publish("OPTION_UI_DELETE_LOCATION", locationObject)
        })
    }
})()
export default uiHandler