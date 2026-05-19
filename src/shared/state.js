import API from "../api/api.js"
import storage from "./storage.js"
import eventBus from "./eventBus.js"
const state=(()=>{
    const locationList=storage.getLocationList()
    const emailList=storage.getEmailList()
    const optionInitialisation=function(){
        locationStateUpdate()
        emailStateUpdate()
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
                locationStateUpdate()
                eventBus.publish("LOCATION_STATE_ADD_LOCATION",keyDataObject)
            } catch(error){
                eventBus.publish("LOCATION_STATE_ADD_LOCATION_ERROR","Invalid Address")
            }
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
            eventBus.publish("LOCATION_STATE_DELETE_LOCATION")
            locationStateUpdate()
        }
    }
    const clearLocationList=function(){
        locationList.splice(0)
        storage.postLocation(locationList)
        locationStateUpdate()
    }
    const locationStateUpdate=function(){
        eventBus.publish("LOCATION_STATE_UPDATE", retrieveState().locations)
    }
/*EMAIL STARTS HERE*/
    const emailStateUpdate=function(){
        eventBus.publish("EMAIL_STATE_UPDATE", retrieveState().emails)
    }
    const detectDuplicateEmail=function(inputEmail){
        if (emailList.filter((emailObject)=>{return emailObject.address===inputEmail}).length==0){
            return false
        } else{
            return true
        }
    }
    const addEmailObject=function(inputEmail){
        console.log(detectDuplicateEmail(inputEmail))
        if (detectDuplicateEmail(inputEmail)==false){
            const emailObject={
                address:inputEmail,
                emailLocations:[],
                noEmailLocations:retrieveState().locations,
                locationList:retrieveState().locations
            }
            emailList.push(emailObject)
            storage.postEmail(emailList)
            emailStateUpdate()
            eventBus.publish("EMAIL_STATE_ADD_EMAIL", emailObject)
            return
        } else {
            eventBus.publish("EMAIL_STATE_ADD_EMAIL_ERROR", "Email Already Exists")
        }
    }
    const getEmailObject=function(emailString){
        const specificEmailObjectArray=emailList.filter((emailObject)=>{
            return emailObject.address===emailString
        })
        if (specificEmailObjectArray.length==1){
            return specificEmailObjectArray[0]
        } else{
            return "Error"
        }
    }
    const deleteEmailObject=function(emailObject){
        const index=emailList.findIndex((emailObjects)=>emailObjects===emailObject)
        if (index==-1){
            return
        } else {
            emailList.splice(index,1)
            storage.postEmail(emailList)
            eventBus.publish("EMAIL_STATE_DELETE_EMAIL")
            emailStateUpdate()
        }
    }
    const clearEmailList=function(){
        emailList.splice(0)
        storage.postEmail(emailList)
        emailStateUpdate()
    }
    const retrieveState=function(){
        return {
            locations:structuredClone(locationList),
            emails:structuredClone(emailList)
        }
    }

    return{
        optionInitialisation,
        addLocationObject,
        getLocationObject,
        deleteLocationObject,
        clearLocationList,
        addEmailObject,
        getEmailObject,
        deleteEmailObject,
        clearEmailList,
        retrieveState
        }
})()
export default state