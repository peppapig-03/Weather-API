import API from "../../shared/api.js"
import config from "../../shared/config.js"
const backend=(function(){
    const APIURL=config.API_URL
    const fetchAllEmails=async function(){
        const result=await API.request(`${APIURL}/subscriptions/all`)
        return result
    }
    const postEmail=async function(emailAddress){
        const result=await API.request (`${APIURL}/emails/new`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({emailAddress:emailAddress}, null, 2)
        })
        return result
    }
    const getEmailSubscriptions=async function(emailAddress){
        const result=await API.request(`${APIURL}/subscriptions/${emailAddress}`)
        return result
    }
    const getAllLocations=async function(){
        const result=await API.request(`${APIURL}/subscriptions/allLocations`)
        return result
    }
    const deleteEmail=async function(emailAddress){
        const result=await API.request(`${APIURL}/emails/delete/${emailAddress}`,{
                method:"DELETE"
            })
        return result
    }
    const deleteAllEmails=async function(){
        const result=await API.request(`${APIURL}/emails/delete/all`,{
                method:"DELETE"
            })
        return result
    }
    const postSubscription=async function(emailAddress, locationName){
        const result=await API.request(`${APIURL}/subscriptions/new`,{
                method:"POST",
                headers: {
                        "Content-Type":"application/json"
                    },
                body: JSON.stringify({emailAddress:emailAddress, locationName:locationName},null,2)
            })
        return result
    }
    const deleteSubscriptionFromEmail=async function(emailAddress, locationName){
        const result=await API.request(`${APIURL}/subscriptions/delete/${emailAddress}/${locationName}`,{
                method:"DELETE"
            })
        return result
    }
    const deleteAllSubscriptionsFromEmail=async function(emailAddress){
        const result=await API.request(`${APIURL}/subscriptions/delete/${emailAddress}/all`,{
            method:"DELETE"
        })
        return result
    }
    const deleteAllSubscriptions=async function(){
        const result=await API.request(`${APIURL}/delete/all`,{
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