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
        const emailSubscriptions=emailCache[inputEmail]
        if (emailSubscriptions!=null){
            const emailObject={
                emailAddress:inputEmail,
                subscribedLocations:emailSubscriptions,
                allLocations:locationCache
            }
            eventBus.publish("EMAIL_STATE_GET_EMAIL_SUBSCRIPTIONS", emailObject)
            return emailObject
        } else{
            emailStateAlert(`Error: 404 EMAIL_NOT_FOUND`)
        }
        return
    }
    const processEmailSubscriptions=async function(inputEmailObject){
        const emailAddress=inputEmailObject["emailAddress"]
        const oldSubbed=inputEmailObject["oldSubscribedLocations"]
        const newSubbed=inputEmailObject["newSubscribedLocations"]
        await deleteAllSubscriptionsFromEmail(emailAddress)
        await postNewSubscriptions(emailAddress, newSubbed)
        await refreshEmailSubscriptions(emailAddress)
        return
    }
    const refreshEmailSubscriptions=async function(inputEmail){
        if (emailCache[inputEmail]!=undefined){
            const response=await backend.getEmailSubscriptions(inputEmail)
            if (!response.error){
                emailCache[inputEmail]=response.data[inputEmail]
            } else{
                emailStateError(response)
            }
        }
        return
    }
    const postNewSubscriptions=async function(inputEmail, locationArray){
        try{
            const response=await Promise.all(
                locationArray.map(async (location)=>{
                    return await backend.postSubscription(inputEmail, location)
            }))
        } catch(error){
            emailStateAlert("Error: 500 BACKEND_SERVER_ERROR")
        }
        return
    }
    const deleteEmail=async function(inputEmail){
        const response=await backend.deleteEmail(inputEmail)
        if (!response.error){
            delete emailCache[inputEmail]
            emailStateUpdate()
            eventBus.publish("EMAIL_STATE_DELETE_EMAIL")
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
            emailStateAlert(response.message)
        } else{
            emailStateError(response)
        }
        return
    }
    const deleteSubscriptionFromEmail=async function(inputEmail,inputLocation){
        const response=await backend.deleteSubscriptionFromEmail(inputEmail, inputLocation)
        if (!response.error){
            emailCahce[inputEmail]=emailCache[inputEmail].filter((locations)=>locations!=inputLocation)
        } else{
            emailStateError(response)
        }
        return
    }
    const deleteAllSubscriptionsFromEmail=async function(inputEmail){
        const response=await backend.deleteAllSubscriptionsFromEmail(inputEmail)
        if (!response.error){
            emailCache[inputEmail]=[]
        } else{
            emailStateError(response)
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
    const sendEmail=async function(emailAddress){
        const response=await backend.sendEmail(emailAddress)
        if (!response.error){
            emailStateAlert("Email Sent!")
        } else{
            emailStateError(response)
        }
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
        deleteAllSubscriptions,
        sendEmail,
        processEmailSubscriptions
        }
})()
export default state