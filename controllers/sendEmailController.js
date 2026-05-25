import sendEmailFlow from "../serviceFlows/sendEmailFlow.js"
import utils from "../shared/utils.js"
const sendEmailController=async function(req,res){
    const emailAddress=req.params.email
    try{
        const array=await sendEmailFlow(emailAddress)
        res.json(utils.successfulJSON("GET_WEATHER_SUCCESS", array))
    } catch(error){
        res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
    }
}
export default sendEmailController