import emailjs from "@emailjs/nodejs"
import dotenv from "dotenv"
dotenv.config()
const APIEmail=(function(){
    const generateHTML=function(locationObject){
        const entriesHTML=Object.keys(locationObject).map((locationName)=>{
            const locationDetails=locationObject[locationName]
            return `<div style="margin-bottom:20px">
                <h2>${locationName}</h2>
                <h4>Temperature: ${locationDetails["temperature"]} degrees Celsius</h4>
                <h4>Weather: ${locationDetails["weather"]}</h4>
            </div>`
        }).join("")
        return entriesHTML
    }
    const generateActualTimeString=function(timeString){
        let ampm
        let hour=timeString.slice(0,2)
        let minute=timeString.slice(3,5)
        let hourint=parseInt(hour)
        if (hourint==0){
            hour="12"
            ampm='am'
        } else if(hourint<=11){
            ampm='am'
        } else if(hourint==12){
            ampm='pm'
        } else if (hourint<=21){
            ampm='pm'
            hour="0"+(hourint-12).toString()
        } else{
            ampm='pm'
            hour=(hourint-12).toString()
        }
        const finalString=`${hour}.${minute} ${ampm}`
        return finalString
    }
    const generateTimeHTML=function(){
        const now=new Date()
        const timeString=now.toLocaleTimeString('en-GB',{
            timeZone: 'Asia/Singapore'
        })
        const synthTimeString=generateActualTimeString(timeString)
        const dateString=now.toLocaleDateString('en-GB',{
            timeZone:'Asia/Singapore'
        })
        return `<div style="margin-bottom:20px">
                <h1>LIVE WEATHER UPDATE</h1>
                </div>
                <div style="margin-bottom:20px">
                <h3>Date: ${dateString}</h3>
                <h3>Time: ${synthTimeString} (GMT + 8)</h3>
                </div><div style="margin-bottom:20px">
                <h1>Interested Locations:</h1>
                <h2></h2>
            </div>`
    }
    const sendEmail=async function(emailAddress, locationObject){
        try{
        emailjs.init({
            privateKey:process.env.EMAIL_PRIVATE_KEY,
            publicKey:process.env.EMAIL_PUBLIC_KEY
        })
        const timeHTML=generateTimeHTML()
        const entriesHTML=generateHTML(locationObject)
        const actualHTML=`${timeHTML}${entriesHTML}`
        await emailjs.send(process.env.EMAIL_SERVICE_ID, 
            process.env.EMAIL_TEMPLATE_ID,
            {
                locations:actualHTML,
                email:emailAddress
            }
        )
    } catch(error){
        const newError=new Error("EMAIL_SEND_ERROR")
        newError.status=400
        throw newError
    }
    }
    return {
        sendEmail
    }
})()
export default APIEmail