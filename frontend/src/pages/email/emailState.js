import eventBus from "../../shared/eventBus.js"
import backend from "./emailBackend.js"
const state=(()=>{
    let emailCache
    let locationCache
    const emailInitialisation=async function(){
        const response=await backend.fetchAllEmails()
        if (!response.error){
           emailCache=response["data"]
        } else{
            emailStateError(response) 
        }
        return
    }
    const locationInitialisation=async function(){
        const response=await backend.getAllLocations()
        if (!response.error){
            locationCache=response["data"]
        } else{
            emailStateError(response)
        }
        return
    }
    const optionInitialisation=async function(){
        await emailInitialisation()
        await locationInitialisation()
        emailStateUpdate()
        return
    }  
    const postEmail=async function(inputEmail){
        const response=await backend.postEmail(inputEmail)
        if (!response.error){
            emailCache[inputEmail]=[]
            emailStateUpdate()
            eventBus.publish("EMAIL_STATE_POST_EMAIL",inputEmail)
        } else{
            emailStateError(response)
        }
        return
    }
    const getEmailSubscriptions=async function(inputEmail){
        console.log(emailCache)
        console.log(locationCache)
        const emailSubscriptions=emailCache[inputEmail]
        if (emailSubscriptions!=null){
            const notSubscribed=locationCache.filter((locationName)=>{
                return !emailSubscriptions.includes(locationName)
            })
            const emailObject={
                emailAddress:inputEmail,
                subscribedLocations:emailSubscriptions,
                notSubscribedLocations:notSubscribed,
                allLocations:locationCache
            }
            eventBus.publish("EMAIL_STATE_GET_EMAIL_SUBSCRIPTIONS", emailObject)
            return emailObject
        } else{
            emailStateAlert(`Error: 404 EMAIL_NOT_FOUND`)
        }
        return
    }
    const deleteEmail=async function(inputEmail){
        const response=await backend.deleteEmail(inputEmail)
        if (!response.error){
            delete emailCache[inputEmail]
            emailStateUpdate()
            /*eventBus.publish("EMAIL_UI_SELECT_FIRST_OPTION")*/
            emailStateAlert(response.message)
        } else{
            emailStateError(response)
        }
        return
    }
    const deleteAllEmails=async function(){
        const response=await backend.deleteAllEmails()
        if (!response.error){
            emailCache={}
            emailStateUpdate()
            /*eventBus.publish("EMAIL_UI_SELECT_FIRST_OPTION")
            */ emailStateAlert(response.message)
        } else{
            emailStateError(response)
        }
        return
    }
    const deleteAllSubscriptionsFromEmail=async function(inputEmail){
        const response=await backend.deleteAllSubscriptionsFromEmail(inputEmail)
        if (!response.error){

        } else{

        }
        return
    }
    const deleteAllSubscriptions=async function(){
        const response=await backend.deleteAllSubscriptions()
        if (!response.error){

        } else{

        }
        return
    }
    const emailStateUpdate=function(){
        eventBus.publish("EMAIL_STATE_UPDATE", retrieveState())
    }
    const emailStateAlert=function(alertMessage){
        eventBus.publish("EMAIL_STATE_ALERT", alertMessage)
    }
    const retrieveState=function(){
        return Object.keys(emailCache)
    }
    const emailStateError=function(response){
        emailStateAlert(`Error: ${response.status} ${response.error}`)
    }

    return{
        optionInitialisation,
        postEmail,
        getEmailSubscriptions,
        deleteEmail,
        deleteAllEmails,
        retrieveState,
        deleteAllSubscriptionsFromEmail,
        deleteAllSubscriptions
        }
})()
export default state