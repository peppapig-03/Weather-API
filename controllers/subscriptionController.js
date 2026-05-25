import subServ from "../services/subscriptionServices.js"
import locServ from "../services/locationServices.js"
import utils from "../shared/utils.js"
const subscriptionController=(function(){
    const postNewEmail=async function(req,res){
        try{
            await subServ.postEmail(req.body.emailAddress)
            res.json(utils.successfulJSON("POST_EMAIL_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteAllEmails=async function(req,res){
        try{
            await subServ.deleteAllEmails()
            res.json(utils.successfulJSON("DELETE_ALL_EMAILS_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteOneEmail=async function(req,res){
        try{
            const emailAddress=req.params.email
            await subServ.emailValidation(emailAddress)
            await subServ.deleteOneEmail(emailAddress)
            res.json(utils.successfulJSON("DELETE_EMAIL_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const getAllSubscriptions=async function(req,res){
        try{
            const responseObj=await subServ.getAllSubscriptions()
            res.json(utils.successfulJSON("GET_ALL_SUBSCRIPTIONS",responseObj))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const getSubscriptionsForFrontend=async function(req,res){
        try{
            const responseObj=await subServ.getSubscriptionsForFrontend(req.params.email)
            res.json(utils.successfulJSON("GET_SUBSCRIPTIONS_SUCCESS",responseObj))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const postNewSubscription=async function(req,res){
        try{
            const locationName=req.body.locationName
            const emailAddress=req.body.emailAddress
            await locServ.locationValidation(locationName)
            await subServ.emailValidation(emailAddress)
            const locationID=await locServ.getLocationID(locationName)
            const emailID=await subServ.getEmailID(emailAddress)
            await subServ.postNewSubscription(emailID, locationID)
            res.json(utils.successfulJSON("POST_SUBSCRIPTION_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteAllSubscriptions=async function(req,res){
        try{
            await subServ.deleteAllSubscriptions()
            res.json(utils.successfulJSON("DELETE_ALL_SUBSCRIPTIONS_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteAllSubscriptionsFromEmail=async function(req,res){
        try{
            const emailAddress=req.params.email
            await subServ.emailValidation(emailAddress)
            const emailID=await subServ.getEmailID(emailAddress)
            await subServ.deleteAllSubscriptionsFromEmail(emailID)
            res.json(utils.successfulJSON("DELETE_ALL_SUBSCRIPTIONS_FROM_EMAIL_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteSubscription=async function(req,res){
        try{
            const locationName=req.params.location
            const emailAddress=req.params.email
            await locServ.locationValidation(locationName)
            await subServ.emailValidation(emailAddress)
            const locationID=await locServ.getLocationID(locationName)
            const emailID=await subServ.getEmailID(emailAddress)
            await subServ.deleteSubscription(emailID, locationID)
            res.json(utils.successfulJSON("DELETE_SUBSCRIPTION_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const getAllLocations=async function(req,res){
        try{
            const data=await locServ.getAllLocations()
            res.json(utils.successfulJSON("GET_ALL_LOCATIONS_SUCCESS", data))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }

    }
    return {
        postNewEmail,
        deleteAllEmails,
        deleteOneEmail,
        getAllSubscriptions,
        getSubscriptionsForFrontend,
        postNewSubscription,
        deleteAllSubscriptions,
        deleteAllSubscriptionsFromEmail,
        deleteSubscription,
        getAllLocations
    }
})()
export default subscriptionController