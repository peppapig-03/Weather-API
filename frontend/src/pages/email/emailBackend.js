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
        const result=await request("http://localhost:4000/subscriptions/all")
        return result
    }
    const postEmail=async function(emailAddress){
        const result=await request ("http://localhost:4000/emails/new", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({emailAddress:emailAddress}, null, 2)
        })
        return result
    }
    const getEmailSubscriptions=async function(emailAddress){
        const result=await request(`http://localhost:4000/subscriptions/${emailAddress}`)
        return result
    }
    const getAllLocations=async function(){
        const response=request("http://localhost:4000/subscriptions/allLocations")
        return response
    }
    const deleteEmail=async function(emailAddress){
        const result=await request(`http://localhost:4000/emails/delete/${emailAddress}`,{
                method:"DELETE"
            })
        return result
    }
    const deleteAllEmails=async function(){
        const result=await request("http://localhost:4000/emails/delete/all",{
                method:"DELETE"
            })
        return result
    }
    const postSubscription=async function(emailAddress, locationName){
        const result=await request(`http://localhost:4000/subscriptions/new`,{
                method:"POST",
                headers: {
                        "Content-Type":"application/json"
                    },
                body: JSON.stringify({emailAddress:emailAddress, locationName:locationName},null,2)
            })
        return result
    }
    const deleteSubscriptionFromEmail=async function(emailAddress, locationName){
        const result=await request(`http://localhost:4000/subscriptions/delete/${emailAddress}/${locationName}`,{
                method:"DELETE"
            })
        return result
    }
    const deleteAllSubscriptionsFromEmail=async function(emailAddress){
        const result=await request(`http://localhost:4000/subscriptions/delete/${emailAddress}/all`,{
            method:"DELETE"
        })
        return result
    }
    const deleteAllSubscriptions=async function(){
        await request("http://localhost:4000/delete/all",{
            method:"DELETE"
        })
    }
    return {
        fetchAllEmails,
        postEmail,
        getEmailSubscriptions,
        getAllLocations,
        deleteEmail,
        deleteAllEmails,
        postSubscription,
        deleteSubscriptionFromEmail,
        deleteAllSubscriptionsFromEmail,
        deleteAllSubscriptions
    }
})()

export default backend