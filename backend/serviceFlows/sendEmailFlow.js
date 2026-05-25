import APIEmail from "../infrastructure/APIEmail.js"
import subServ from "../services/subscriptionServices.js"
import eAPI from "../infrastructure/externalAPI.js"
import locServ from "../services/locationServices.js"
const sendEmailFlow=async function(inputEmail){
    await subServ.emailValidation(inputEmail) 
    const locationArray=await subServ.getSubscriptions(inputEmail)
    const locationObject=await locServ.getWeatherData(locationArray)
    await APIEmail.sendEmail(inputEmail, locationObject)
}
export default sendEmailFlow 