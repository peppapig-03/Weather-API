const uiCreation=(function(){
    const createInputBox=function(){
        const box=document.createElement("div")
        box.classList.add("inputBox")
        return box
    }
    const createSubmitButton=function(){
        const button=document.createElement("button")
        button.classList.add("submitButton")
        return button
    }
    const createHeaderButton=function(){
        const button=document.createElement("button")
        button.classList.add("headerButton")
        return button
    }
    const createFooterButton=function(){
        const button=document.createElement("button")
        button.classList.add("footerButton")
        return button
    }
    const createFullForm=function(){
        const form=document.createElement("form")
        const inputBox=createInputBox()
        const input=document.createElement("input")
        const label=document.createElement("label")
        const submitButton=createSubmitButton()
        form.appendChild(inputBox)
        inputBox.appendChild(label)
        inputBox.appendChild(input)
        form.appendChild(submitButton)
        return {
            form,
            label,
            input,
            submitButton
        }
    }
    const createMainForm=function(){
        const form=document.createElement("form")
        form.classList.add("mainForm")
        return form
    }
    const createCheckBoxFlex=function(){
        const box=document.createElement("div")
        box.classList.add("checkBoxFlex")
        return box
    }
    const createCheckBox=function(locationName){
        const box=createCheckBoxFlex()
        const label=document.createElement("label")
        const checkBox=document.createElement("input")
        checkBox.classList.add("checkBox")
        checkBox.name=locationName
        label.setAttribute("for", locationName)
        label.textContent=locationName
        checkBox.id=locationName
        checkBox.setAttribute("type", "checkbox")
        box.appendChild(checkBox)
        box.appendChild(label)
        return {box, checkBox}
    }
    const createLocationMainButton=function(){
        const button=document.createElement("button")
        button.classList.add("locationMain")
        return button
    }
    const createMainSubmitButton=function(){
        const button=document.createElement("button")
        button.classList.add("mainSubmitButton")
        return button
    }
    return {
        createFullForm,
        createHeaderButton,
        createLocationMainButton,
        createFooterButton,
        createMainForm,
        createCheckBox,
        createMainSubmitButton
    }
})()
export default uiCreation