import sendEmailFlow from "../serviceFlows/sendEmailFlow.js"
import utils from "../shared/utils.js"
import allEmailFlow from "../serviceFlows/allEmailFlow.js"
import keyServ from "../services/keyService.js"
const sendEmailController=(function(){
    const sendOneEmail=async function(req,res){
        const emailAddress=req.params.email
        try{
            const array=await sendEmailFlow(emailAddress)
            res.json(utils.successfulJSON("SEND_EMAIL_SUCCESS", array))
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
        }
    }
    const testAllEmails=async function(req, res){
        try{
            keyServ.validateKey(req.query.key)
            await allEmailFlow()
            res.json(utils.successfulJSON("SEND_ALL_EMAILS_SUCCESS"))
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
        }
    }
    const sendAllEmails=async function(req,res){
        try{
            if (keyServ.validateTime){
                keyServ.validateKey(req.query.key)
                await allEmailFlow()
                res.json(utils.successfulJSON("SEND_ALL_EMAILS_SUCCESS"))
            } else{
                res.status(403).json(utils.errorJSON(403, "TIME_SEND_ERROR"))
            } 
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
        }
    }
    return {
        sendOneEmail,
        sendAllEmails,
        testAllEmails
    }
})()
export default sendEmailController