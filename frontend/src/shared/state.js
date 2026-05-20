import API from "../api/api.js"
import storage from "./storage.js"
import eventBus from "./eventBus.js"
const state=(()=>{
    const locationCollection=storage.getLocationCollection()
    const emailCollection=storage.getEmailCollection()
    const optionInitialisation=function(){
        locationStateUpdate()
        emailStateUpdate()
    }
    const detectDuplicateLocationUUID=function(UUID){
        return Object.hasOwn(locationCollection, UUID)
    }
    const locationUUIDGenerator=function(){
        let UUID=crypto.randomUUID()
        while (detectDuplicateLocationUUID(UUID)==true){
            UUID=crypto.randomUUID()
        }
        return UUID
    }
    const addLocationObject=async function(inputLocation){
        if (detectDuplicateLocation(inputLocation)==true){
            eventBus.publish ("LOCATION_STATE_ADD_LOCATION_ERROR", "Address already exists")
            return
        } else{
            try{
                const keyDataObject=await API.fetchKeyData(inputLocation)
                keyDataObject["UUID"]=locationUUIDGenerator()
                locationCollection[keyDataObject["UUID"]]=keyDataObject
                storage.postLocation(locationCollection)
                locationStateUpdate()
                eventBus.publish("LOCATION_STATE_ADD_LOCATION",keyDataObject)
            } catch(error){
                eventBus.publish("LOCATION_STATE_ADD_LOCATION_ERROR","Invalid Address")
            }
        }
    }
    const getLocationObject=function(locationUUID){
        const locationObject=locationCollection[locationUUID]
        if (locationObject){
            return locationObject
        } else{
            return "Error"
        }
    }
    const detectDuplicateLocation=function(locationInputString){
        if(Object.values(locationCollection).find((locationObject)=>locationObject.originalName===locationInputString)){
            return true
        } else{
            return false
        }
    }
    const deleteLocationObject=function(locationUUID){
        if (locationCollection[locationUUID]){
            delete locationCollection[locationUUID]
            storage.postLocation(locationCollection)
            eventBus.publish("LOCATION_STATE_DELETE_LOCATION")
            locationStateUpdate()
        } else {
            return
        }
    }
    const clearLocationCollection=function(){
        Object.keys(locationCollection).forEach((UUIDKey)=>{
            delete locationCollection[UUIDKey]
        })
        storage.postLocation(locationCollection)
        locationStateUpdate()
    }
    const locationStateUpdate=function(){
        eventBus.publish("LOCATION_STATE_UPDATE", retrieveState().locations)
    }
/*EMAIL STARTS HERE*/
    const emailStateUpdate=function(){
        eventBus.publish("EMAIL_STATE_UPDATE", retrieveState().emails)
    }
    const emailUUIDGenerator=function(){
        let UUID=crypto.randomUUID()
        while (detectDuplicateEmailUUID(UUID)){
            UUID=crypto.randomUUID()
        }
        return UUID
    }
    const detectDuplicateEmailUUID=function(UUID){
        return Object.hasOwn(emailCollection, UUID)
    }
    const detectDuplicateEmail=function(inputEmailString){
        if (Object.values(emailCollection).find((emailObjects)=>emailObjects.address===inputEmailString)){
            return true
        } else{
            return false
        }
    }
    const addEmailObject=function(inputEmailString){
        if (detectDuplicateEmail(inputEmailString)==false){
            const emailUUID=emailUUIDGenerator()
            const emailObject={
                address:inputEmailString,
                emailLocationsUUID:[],
                UUID:emailUUID
            }
            emailCollection[emailUUID]=emailObject
            storage.postEmail(emailCollection)
            emailStateUpdate()
            eventBus.publish("EMAIL_STATE_ADD_EMAIL", emailObject)
            return
        } else {
            eventBus.publish("EMAIL_STATE_ADD_EMAIL_ERROR", "Email Already Exists")
        }
    }
    const getEmailObject=function(emailUUID){
        if (emailCollection[emailUUID]){
            eventBus.publish("EMAIL_STATE_GET_EMAIL", emailCollection[emailUUID], retrieveState().locations)
        } else{
            return "Error"
        }
    }
    const deleteEmailObject=function(emailUUID){
        if (emailCollection[emailUUID]){
            delete emailCollection[emailUUID]
            storage.postEmail(emailCollection)
            eventBus.publish("EMAIL_STATE_DELETE_EMAIL")
            emailStateUpdate()
            return
        } else {
            return
        }
    }
    const clearEmailCollection=function(){
        Object.keys(emailCollection).forEach((UUIDkey)=>{
            delete emailCollection[UUIDkey]
        })
        storage.postEmail(emailCollection)
        emailStateUpdate()
    }
    const retrieveState=function(){
        return {
            locations:structuredClone(Object.values(locationCollection)),
            emails:structuredClone(Object.values(emailCollection))
        }
    }

    return{
        optionInitialisation,
        addLocationObject,
        getLocationObject,
        deleteLocationObject,
        clearLocationCollection,
        addEmailObject,
        getEmailObject,
        deleteEmailObject,
        clearEmailCollection,
        retrieveState
        }
})()
export default state