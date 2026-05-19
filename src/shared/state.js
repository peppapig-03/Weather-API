import API from "../api/api.js"
import storage from "./storage.js"
import eventBus from "./eventBus.js"
const state=(()=>{
    const locationList=storage.getLocationList()
    const optionInitialisation=function(){
        selectBoxChange()
    }
    const addLocationObject=async function(inputLocation){
        if (detectDuplicateLocation(inputLocation)==true){
            eventBus.publish ("LOCATION_STATE_ADD_LOCATION_ERROR", "Address already exists")
            return
        } else{
            try{
                const keyDataObject=await API.fetchKeyData(inputLocation)
                locationList.push(keyDataObject)
                storage.postLocation(locationList)
                selectBoxChange()
                eventBus.publish("LOCATION_STATE_ADD_LOCATION",keyDataObject)
            } catch(error){
                eventBus.publish("LOCATION_STATE_ADD_LOCATION_ERROR","Invalid Address")
            }
        }
    }
    const createStateInstance=function(){
        return {
            locations:structuredClone(locationList),
            emails:structuredClone(emailList)
        }
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
            storage.postLocation(locationList)
            eventBus.publish("LOCATION_STATE_DELETE_LOCATION", retrieveState().locations)
            selectBoxChange()
        }
    }
    const retrieveState=function(){
        return createStateInstance()
    }
    const clearLocationList=function(){
        locationList.splice(0)
        storage.postLocation(locationList)
        selectBoxChange()
    }
    const selectBoxChange=function(){
        eventBus.publish("LOCATION_STATE_UPDATE", retrieveState().locations)
    }
    const lastLocationObject=function(){
        if (locationList==[]){
            return 0
        } else {
            return locationList.at(-1)
        }
    }
/*EMAIL STARTS HERE*/
    const emailList=storage.getEmailList()
    

    return{
        optionInitialisation,
        addLocationObject,
        getLocationObject,
        deleteLocationObject,
        retrieveState,
        clearLocationList,
        lastLocationObject
        }
})()
export default state