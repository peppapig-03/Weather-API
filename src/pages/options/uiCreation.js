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
    const createFullForm=function(){
        const form=document.createElement("form")
        const inputBox=createInputBox()
        const input=document.createElement("input")
        const label=document.createElement("label")
        const submitButton=createSubmitButton()
        const header=document.querySelector("header")
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
    const createDeleteLocationButton=function(){
        const button=document.createElement("button")
        button.classList.add("deleteLocation")
        return button
    }
    return {
        createFullForm,
        createDeleteLocationButton
    }
})()
export default uiCreation