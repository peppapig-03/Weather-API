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
        const timeString=now.toLocaleTimeString('en-GB')
        if (["07","08","11","12","15","16","20","21"].includes(timeString.slice(0,2))){
            return true
        } else{
            return false
        }
    }
    return {
        validateKey,
        validateTime
    }
})()
export default keyService