const API=(function(){
    const request=async function(url, details={}){
        try{
            const data=await fetch(url, details)
            const synth=await data.json()
            return synth
        } catch(error){
            return ({
                ok:false,
                error:"BACKEND_SERVER_ERROR",
                status:500
            })
        }
    }
    return {request}
})()
export default API