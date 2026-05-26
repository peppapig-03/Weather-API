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
    const sendEmail=async function(emailAddress, locationObject){
        try{
        emailjs.init({
            privateKey:process.env.EMAIL_PRIVATE_KEY,
            publicKey:process.env.EMAIL_PUBLIC_KEY
        })
        const entriesHTML=generateHTML(locationObject)
        await emailjs.send(process.env.EMAIL_SERVICE_ID, 
            process.env.EMAIL_TEMPLATE_ID,
            {
                locations:entriesHTML,
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