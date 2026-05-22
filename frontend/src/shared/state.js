import API from "../api/api.js"
import storage from "./storage.js"
import eventBus from "./eventBus.js"
import backend from "./backend.js"
const state=(()=>{
    let locationList
    let emailList
    const dataInitialisation=async function(){
        try{
            locationList=await backend.fetchAllLocations()
            emailList=await backend.fetchAllLocations()
        } catch(error){
            console.log(error)
        }
    }
    const optionInitialisation=async function(){
        await dataInitialisation()
        locationStateUpdate()
        emailStateUpdate()
    }
    
    const addLocation=async function(inputLocation){
        try{
            const response=await backend.postLocation(inputLocation)
            return response
        } catch(error){
            alert(`Error: ${error.status} ${error.message}`) 
            throw error   
            /*eventBus.publish("LOCATION_STATE_ADD_LOCATION_ERROR","Invalid Address")
        */}
    }
    const getLocationObject=async function(inputLocation){
        try{
            const locationObject=await backend.getLocation(inputLocation)
            return locationObject
        } catch(error){
            alert(`Error: ${error.status} ${error.message}`)
            throw error
        }
    }
    const deleteLocation=async function(inputLocation){
        try{
            const response=await backend.deleteLocation(inputLocation)
            return response.message
        } catch(error){
            alert(`Error: ${error.status} ${error.message}`)
            throw error
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
        addLocation,
        getLocationObject,
        deleteLocation,
        clearLocationCollection,
        addEmailObject,
        getEmailObject,
        deleteEmailObject,
        clearEmailCollection,
        retrieveState
        }
})()
export default state