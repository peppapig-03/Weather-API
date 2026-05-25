import API from "../../shared/api.js"
const backend=(function(){
    const fetchAllEmails=async function(){
        const result=await API.request("http://localhost:4000/subscriptions/all")
        return result
    }
    const postEmail=async function(emailAddress){
        const result=await API.request ("http://localhost:4000/emails/new", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({emailAddress:emailAddress}, null, 2)
        })
        return result
    }
    const getEmailSubscriptions=async function(emailAddress){
        const result=await API.request(`http://localhost:4000/subscriptions/${emailAddress}`)
        return result
    }
    const getAllLocations=async function(){
        const result=await API.request("http://localhost:4000/subscriptions/allLocations")
        return result
    }
    const deleteEmail=async function(emailAddress){
        const result=await API.request(`http://localhost:4000/emails/delete/${emailAddress}`,{
                method:"DELETE"
            })
        return result
    }
    const deleteAllEmails=async function(){
        const result=await API.request("http://localhost:4000/emails/delete/all",{
                method:"DELETE"
            })
        return result
    }
    const postSubscription=async function(emailAddress, locationName){
        const result=await API.request(`http://localhost:4000/subscriptions/new`,{
                method:"POST",
                headers: {
                        "Content-Type":"application/json"
                    },
                body: JSON.stringify({emailAddress:emailAddress, locationName:locationName},null,2)
            })
        return result
    }
    const deleteSubscriptionFromEmail=async function(emailAddress, locationName){
        const result=await API.request(`http://localhost:4000/subscriptions/delete/${emailAddress}/${locationName}`,{
                method:"DELETE"
            })
        return result
    }
    const deleteAllSubscriptionsFromEmail=async function(emailAddress){
        const result=await API.request(`http://localhost:4000/subscriptions/delete/${emailAddress}/all`,{
            method:"DELETE"
        })
        return result
    }
    const deleteAllSubscriptions=async function(){
        const result=await API.request("http://localhost:4000/delete/all",{
            method:"DELETE"
        })
        return result
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