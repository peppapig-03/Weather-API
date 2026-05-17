import API from "./api.js"
const state=(()=>{
    const locationList=[]
    const addLocationObject=async function(inputLocation){
        const keyDataObject=await API.fetchKeyData(inputLocation)
        locationList.push(keyDataObject)
        printState()
    }
    const createStateInstance=function(){
        return [...locationList]
    }
    const printState=function(){
        console.log(createStateInstance())
        locationList.forEach((object)=>{
        console.log(object)
        })
    }
    const currentLocationCount=function(){
        return locationList.length
    }    
    return {addLocationObject,
        printState
        }
})()
export default state