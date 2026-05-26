import APIEmail from "../infrastructure/APIEmail.js"
import subServ from "../services/subscriptionServices.js"
import locServ from "../services/locationServices.js"
const sendAllEmails=async function(){
    const completeSubscriptionList=await subServ.getAllSubscriptions()
    const sendEmailsList=Object.keys(completeSubscriptionList).filter((email)=>{
        return completeSubscriptionList[email].length!=0
    })
    let currentIndex=0
    const maxIndex=sendEmailsList.length
    if (maxIndex==0){
        const newError=new Error("NO_SUBSCRIPTIONS_TO_SEND_EMAIL")
        newError.status=404
        throw newError
    }
    let worker=async function(){
        while(currentIndex<maxIndex){
            const index=currentIndex
            currentIndex++
            const email=sendEmailsList[index]
            const locationArray=completeSubscriptionList[email]
            const locationObject=await locServ.getWeatherData(locationArray)
            await APIEmail.sendEmail(email, locationObject)
        }
    }
    await Promise.all([
        worker()
    ])
    return
}
export default sendAllEmails