function httpRequestMaker(inputPhrase){
    const httpPhrase=inputPhrase.split(" ").join("%20")
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${httpPhrase}/?unitGroup=metric&key=DG3J54RLAVLUM2EPNYU2DDP68&contentType=json`
}
function synthesiseAddress(inputPhrase){
    if (inputPhrase.toUpperCase()==inputPhrase.toLowerCase()){
       return inputPhrase
    } else {
       const comma=inputPhrase.search(",")
        if (comma==-1){
            return inputPhrase
        } else{
            return inputPhrase.slice(0,comma)
        }
    }    
}
function createInputBox(){
    const box=document.createElement("div")
    box.classList.add("inputBox")
    return box
}
function createSubmitButton(){
    const button=document.createElement("button")
    button.classList.add("submitButton")
    return button
}
function createFullForm(){
    const form=document.createElement("form")
    const inputBox=createInputBox()
    const input=document.createElement("input")
    const label=document.createElement("label")
    const submitButton=createSubmitButton()
    const header=document.querySelector("header")
    header.appendChild(form)
    form.appendChild(inputBox)
    inputBox.appendChild(label)
    inputBox.appendChild(input)
    form.appendChild(submitButton)
    return {
        form,
        inputBox,
        label,
        input
    }
}
function clearMain(){
    const main=document.querySelector("main")
    while(main.firstElementChild){
        main.removeChild(main.lastElementChild)
    }
}
function clearHeader(){
    const header=document.querySelector("header")
    while(header.firstElementChild){
        header.removeChild(header.lastElementChild)
    }
}
function clearSelectBox(selectBox){
    while(selectBox.firstElementChild){
        selectBox.removeChild(selectBox.lastElementChild)
    }
}
function addNewLocationToSelectBox(selectBox){
    const option=document.createElement("option")
    option.value="New Location"
    option.textContent="New Location"
    selectBox.appendChild(option)
}
function updateSelectBox(selectArray/*Array of location names(string)*/){
    const select=document.querySelector("select")
    clearSelectBox(select)
    const optionArray=[]
    addNewLocationToSelectBox(select)
    selectArray.forEach((locationName)=>{
        const option=document.createElement("option")
        option.value=locationName
        option.textContent=locationName
        select.appendChild(option)
        optionArray.push(option)
    })
    
    return {
        select,
        optionArray
    }

}
function despawnForm(){
    try{
        const form=document.querySelector("form")
        const header=document.querySelector("header")
        header.removeChild(form)
    } catch {
        return
    }
}
export {httpRequestMaker,
    synthesiseAddress,
    createFullForm,
    updateSelectBox,
    clearMain,
    despawnForm,
    clearHeader
}