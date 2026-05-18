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
        input,
        submitButton
    }
}
function deKebab(inputWord){
    let capitals=[0]
    for(let index=1;index<inputWord.length;index++){
        const letter=inputWord[index]
        if (letter.toUpperCase()==letter){
            capitals.push(index)
        }
    }
    capitals.push(inputWord.length)
    inputWord=`${inputWord[0].toUpperCase()}${inputWord.slice(1,inputWord.length)}`
    if (capitals.length==2){
        return inputWord
    } else{
        let finalWord=""
        for(let rightindex=1;rightindex<capitals.length;rightindex++){
            let right=capitals[rightindex]
            let left=capitals[rightindex-1]
            const currentWord=inputWord.slice(left,right)
            finalWord=`${finalWord} ${currentWord}`
        }
        return finalWord.slice(1,finalWord.length)
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
function createDeleteLocationButton(){
    const button=document.createElement("button")
    button.classList.add("deleteLocation")
    return button
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
    clearHeader,
    createDeleteLocationButton,
    deKebab
}