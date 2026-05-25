import subRepo from "../repositories/subscriptionRepository.js"
import emailRepo from "../repositories/emailRepository.js"
import utils from "../shared/utils.js"
const subscriptionServices=(function(){
    const emailValidation=async function(emailAddress){
        const response=await emailRepo.retrieveEmail(emailAddress)
        if (response.length==0){
            const newError=new Error("EMAIL_NOT_FOUND")
            newError.status=404
            throw newError
        }
        return
    }
    const postEmail=async function(emailAddress){
        await emailRepo.insertEmail(emailAddress)
        return
    }
    const deleteAllEmails=async function(){
        await emailRepo.deleteAll()
        return
    }
    const deleteOneEmail=async function(emailAddress){
        await emailRepo.deleteOneEmail(emailAddress)
        return
    }
    const getSubscriptions=async function(emailAddress){
        const response=await subRepo.retrieveSubscriptionsForOneEmail(emailAddress)
        if (response.length==0){
            const newError=new Error("SUBSCRIPTIONS_NOT_FOUND")
            newError.status=404
            throw newError
        }
        const synthesisedData=response.map((rowObject)=>{
            return rowObject["originalname"]
        })
        return synthesisedData
    }
    const getSubscriptionsForFrontend=async function(emailAddress){
        const response=await subRepo.retrieveSubscriptionsForOneEmail(emailAddress)    
        const synthesisedData=response.map((rowObject)=>{
            return rowObject["originalname"]
        })
        const responseObj={}
        responseObj[emailAddress]=synthesisedData
        return responseObj
    }
    const getAllSubscriptions=async function(){
        const rawData=await subRepo.retrieveAllSubscriptions()
        const responseObject={}
        rawData.forEach((rowObject)=>{
            const email=rowObject["emailaddress"]
            const location=rowObject["originalname"]
            if (responseObject[email]==undefined){
                responseObject[email]=[]
            }
            if (location){
                responseObject[email].push(location)
            }
        })
        return responseObject
    }
    const getEmailID=async function(emailAddress){
        const response=await emailRepo.retrieveEmail(emailAddress)
        return response[0]["id"]
    }
    const postNewSubscription=async function(emailID, locationID){
        await subRepo.insertNewSubscription(emailID, locationID)
        return
    }
    const deleteAllSubscriptions=async function(){
        await subRepo.deleteAllSubscriptions()
        return
    }
    const deleteAllSubscriptionsFromEmail=async function(emailID){
        await subRepo.deleteAllSubscriptionsFromEmail(emailID)
        return
    }
    const deleteSubscription=async function(emailID, locationID){
        await subRepo.deleteSubscription(emailID, locationID)
        return
    }
    return {
        emailValidation,
        postEmail,
        getSubscriptions,
        deleteAllEmails,
        deleteOneEmail,
        getAllSubscriptions,
        getSubscriptionsForFrontend,
        getEmailID,
        postNewSubscription,
        deleteAllSubscriptions,
        deleteAllSubscriptionsFromEmail,
        deleteSubscription
    }
})()
export default subscriptionServices