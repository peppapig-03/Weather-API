const backend=(function(){
    const request=async function(url, detailObject={}){
        try{
            const data=await fetch(url, detailObject)
            const synth=await data.json()
            return synth
        } catch(error){
            const errorObj={
                ok:false,
                error:"BACKEND_SERVER_ERROR",
                status:500
            }
        }
    }
    const fetchAllEmails=async function(){
        const result=await request("http://localhost:4000/emails/all")
    }
    const postEmail=async function(emailAddress){
        try{
            const data=await fetch("http://localhost:4000/emails/new", {
                    method:"POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({emailAddress:emailAddress},null,2)
                })
            const synth=await data.json()
            return synthHandler(synth)
    } catch(error){
        backendErrorHandler()
    }
    }
    const getEmailSubscriptions=async function(emailAddress){
        try{
            const data=await fetch(`http://localhost:4000/subscriptions/${emailAddress}`)
            const synth=await data.json()
            synthHandler(synth)
        } catch(error){
            backendErrorHandler()
        }
    }
    const deleteEmail=async function(emailAddress){
        try{
            const data=await fetch(`http://localhost:4000/emails/delete/${emailAddress}`,{
                method:"DELETE"
            })
            const synth=await data.json()
            return synthHandler(synth)
        } catch(error){
        backendErrorHandler()
        }
    }
    const deleteAllEmails=async function(){
        try{
            const data=await fetch("http://localhost:4000/emails/delete/all",{
                method:"DELETE"
            })
            const synth=await data.json()
            return synthHandler(synth)
        } catch(error){
            backendErrorHandler()
        }
    }
    const postSubscription=async function(emailAddress, locationName){
        try{
            const data=await fetch(`http://localhost:4000/subscriptions/new`,{
                method:"POST",
                headers: {
                        "Content-Type":"application/json"
                    },
                body: JSON.stringify({emailAddress:emailAddress, locationName:locationName},null,2)
            })
            const synth=await data.json()
            return synthHandler(synth)
        } catch(error){
            backendErrorHandler()
        }
    }
    const deleteSubscriptionFromEmail=async function(emailAddress, locationName){
        try{
            const data=await fetch(`http://localhost:4000/subscriptions/delete/${emailAddress}/${locationName}`,{
                method:"DELETE"
            })
            const synth=await data.json()
            return synthHandler(synth)
        }catch(error){
            backendErrorHandler()
        }
    }
    const deleteAllSubscriptionsFromEmail=async function(emailAddress){

    }
    return {
        fetchAllEmails,
        postEmail,
        getEmailSubscriptions,
        deleteEmail,
        deleteAllEmails,
        postSubscription,
        deleteSubscriptionFromEmail
    }
})()

export default backend