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
    return {
        successfulJSON,
        errorJSON
    }
})()
export default utils