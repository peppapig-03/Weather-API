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
            eventBus.publish ("STATE_ADD_LOCATION_ERROR", "Address already exists")
            return
        } else{
            try{
                const keyDataObject=await API.fetchKeyData(inputLocation)
                console.log(keyDataObject)
                locationList.push(keyDataObject)
                storage.post(locationList)
                selectBoxChange()
                eventBus.publish("STATE_ADD_LOCATION",keyDataObject)
            } catch(error){
                eventBus.publish("STATE_ADD_LOCATION_ERROR","Invalid Address")
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
            eventBus.publish("STATE_DELETE_LOCATION", retrieveState())
            selectBoxChange()
        }
    }
    const retrieveState=function(){
        return createStateInstance()
    }
    const clearLocationList=function(){
        locationList.splice(0)
        storage.post(locationList)
        selectBoxChange()
    }
    const selectBoxChange=function(){
        eventBus.publish("STATE_UPDATE", retrieveState())
    }
    const lastLocationObject=function(){
        if (locationList==[]){
            return 0
        } else {
            return locationList.at(-1)
        }
    }
    return{
        initialisation,
        addLocationObject,
        getLocationObject,
        deleteLocationObject,
        retrieveState,
        clearLocationList,
        lastLocationObject
        }
})()
export default state