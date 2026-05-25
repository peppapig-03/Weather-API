import dotenv from "dotenv"
dotenv.config()
const utils=(function(){
    const successfulJSON=function(message, data=null){
        if(data!==null){
            return {
                ok:true,
                message:message,
                data:data
            }
        } else {
            return {
                ok:true,
                message:message
            }
        }    
    }
    const errorJSON=function(status,error){
        return {
            ok:false,
            error:error,
            status:status
        }
    }
    function httpRequestMaker(inputPhrase){
        const httpPhrase=inputPhrase.split(" ").join("%20")
        return `${process.env.WEATHER_API_FRONT}${httpPhrase}${process.env.WEATHER_API_BACK}`
    }
    function synthesiseAddress(inputPhrase){
        if (inputPhrase.toUpperCase()==inputPhrase.toLowerCase()){
           return inputPhrase
        } else {
           const comma=inputPhrase.search(",")
            if (comma==-1){
                return inputPhrase
            } else{
                return inputPhrase.slice(0,comma)
            }
        }    
    }
    return {
        successfulJSON,
        errorJSON,
        httpRequestMaker,
        synthesiseAddress
    }
})()
export default utils