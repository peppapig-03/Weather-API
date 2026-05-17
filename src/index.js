import "./styles.css"
import API from "./api.js"
import uiHandler from "./ui.js"
import state from "./state.js"
const body = document.querySelector("body")
const formEventListenerHandler=function(form, event){
    event.preventDefault()
    const newLocation=new FormData(form)
    state.addLocationObject(newLocation.get("newLocation"))
    form.reset()
}
const spawnNewLocationEventListener = function () {
    const formObject=uiHandler.newLocationInput()
    formObject.form.addEventListener("submit",(event)=>{
        formEventListenerHandler(formObject.form, event)
    })
}
const updateUI = function () {
    uiHandler.addTextRectangle()
}
const run = function () {
    spawnNewLocationEventListener()
}
console.log(window)
console.log()
state.addLocationObject("Melaka Central")
state.addLocationObject("Penang")
run()
