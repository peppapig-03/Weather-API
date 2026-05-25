import API from "../../shared/api.js"
const backend=(function(){
    const fetchAllLocations=async function(){
        const result=await API.request("http://localhost:4000/locations/all")
        return result
    }
    const postLocation=async function(locationName){
        const result=await API.request("http://localhost:4000/locations/new", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({originalName:locationName},null,2)
            })
        return result
    }
    const getLocation=async function(locationName){
        const result=await API.request(`http://localhost:4000/locations/${locationName}`)
        return result
    }
    const deleteLocation=async function(locationName){
        const result=await API.request(`http://localhost:4000/locations/delete/${locationName}`,{
            method:"DELETE"
        })
        return result
    }
    const deleteAllLocations=async function(){
        const result=await API.request("http://localhost:4000/locations/delete/all",{
            method:"DELETE"
        })
        return result
    }
    return {
        fetchAllLocations,
        postLocation,
        getLocation,
        deleteLocation,
        deleteAllLocations
    }
})()

export default backend