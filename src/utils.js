function httpRequestMaker(inputPhrase){
    const httpPhrase=inputPhrase.split(" ").join("%20")
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${httpPhrase}/?unitGroup=metric&key=DG3J54RLAVLUM2EPNYU2DDP68&contentType=json`
}
function getAddressBeforeComma(inputPhrase){
    const comma=inputPhrase.search(",")
    if (comma==-1){
        return inputPhrase
    } else{
        return inputPhrase.slice(0,comma)
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
export {httpRequestMaker,
    getAddressBeforeComma,
    createInputBox,
    createSubmitButton
}