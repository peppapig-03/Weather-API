import dotenv from "dotenv"
dotenv.config()
const keyService=(function(){
    const validateKey=function(attemptedKey){
        if (attemptedKey!=process.env.CRON_JOB_KEY){
            const newError=new Error("Wrong API Key")
            newError.status=403
            throw newError
        }
    }
    const validateTime=function(){
        const now=new Date()
        const timeString=now.toLocaleTimeString('en-GB',{
            timeZone:"Asia/Singapore"
        })
        if (["00","23","19","20","03","04"].includes(timeString.slice(0,2))){
            return false
        } else{
            return true
        }
    }
    return {
        validateKey,
        validateTime
    }
})()
export default keyService