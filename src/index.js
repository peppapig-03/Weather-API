import "./styles.css"
import API from "./api.js"
import uiHandler from "./ui.js"
const body=document.querySelector("body")
console.time("TimeRecord")
const run=async function(inputLocation){
    const parsedData=await API.fetchKeyData(inputLocation)
    console.log(parsedData)
    console.log(parsedData.name)
    console.timeLog("TimeRecord")
}
uiHandler.newLocationInput()
uiHandler.newLocationInput()
console.log(window)
console.log()