import API from "./api.js"
import storage from "./storage.js"
import eventBus from "./eventBus.js"
const state=(()=>{
    const locationList=storage.get().locations
    const initialisation=function(){
        selectBoxChange()
    }
    const addLocationObject=async function(inputLocation){
        if (detectDuplicateLocation(inputLocation)==true){
            eventBus.publish ("addLocationObjectError", "Address already exists")
            return
        } else{
            try{
                const keyDataObject=await API.fetchKeyData(inputLocation)
                console.log(keyDataObject)
                locationList.push(keyDataObject)
                storage.post(locationList)
                selectBoxChange()
                eventBus.publish("addLocationObject",keyDataObject)
            } catch(error){
                eventBus.publish("addLocationObjectError","Invalid Address")
            }
        }
    }
    const createStateInstance=function(){
        return structuredClone(locationList)
    }
    const getLocationObject=function(locationNameString){
        const specificLocationObjectArray=locationList.filter((location)=>{
            return location.originalName===locationNameString
        })
        if (specificLocationObjectArray.length==1){
            return specificLocationObjectArray[0]
        } else{
            return "Error"
        }
    }
    const detectDuplicateLocation=function(locationNameString){
        if(locationList.find(location=>location.originalName==locationNameString)!=undefined){
            return true
        } else{
            return false
        }
    }
    const deleteLocationObject=function(locationObject){
        const index=locationList.findIndex((location)=>location===locationObject)
        if (index==-1){
            return
        } else {
            locationList.splice(index,1)
            storage.post(locationList)
            eventBus.publish("deleteLocationObject", "")
            selectBoxChange()
        }
    }
    const retrieveState=function(){
        return createStateInstance()
    }
    const clearLocationList=function(){
        locationList.splice(0)
        storage.post(locationList)
        eventBus.publish("clearLocationList", [])
        selectBoxChange()
    }
    const selectBoxChange=function(){
        eventBus.publish("selectBoxChange", retrieveState())
    }
    return{
        initialisation,
        addLocationObject,
        getLocationObject,
        deleteLocationObject,
        retrieveState,
        clearLocationList
        }
})()
export default state