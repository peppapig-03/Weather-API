import eventBus from "../../shared/eventBus.js"
import backend from "./locationBackend.js"
const state=(()=>{
    let locationCache
    const locationInitialisation=async function(){
        const response=await backend.fetchAllLocations()
        if (!response.error){
            locationCache=response["data"]
        } else{
            locationStateError(response)
        }
        return
    }
    const optionInitialisation=async function(){
        await locationInitialisation()
        locationStateUpdate()
        return
    }  
    const postLocation=async function(inputLocation){
        const response=await backend.postLocation(inputLocation)
        if (!response.error){
            locationCache[inputLocation]=response.data[inputLocation]
            locationStateUpdate()
            eventBus.publish("LOCATION_STATE_POST_LOCATION", inputLocation)
        } else{
            locationStateError(response)
        }
        return
    }
    const getLocationObject=async function(inputLocation){
        const locationObject=locationCache[inputLocation]
        if (locationObject!=undefined){
            eventBus.publish(`LOCATION_STATE_GET_LOCATION_OBJECT`,locationObject)
        } else{
            locationStateAlert(`Error: 404 LOCATION_NOT_FOUND`)
        }
        return
    }
    const getLocationObjectFromBackend=async function(inputLocation){
        const response=await backend.getLocation(inputLocation)
        if (!response.error){
            return response.data[inputLocation]
        } else{
            locationStateError(response)
        }
        return
    }
    const refreshLocationObject=async function(inputLocation){
        const originalLocationObject=locationCache[inputLocation]
        if (originalLocationObject!=undefined){
            const newLocationObject=await getLocationObjectFromBackend(inputLocation)
            locationCache[inputLocation]=newLocationObject
            eventBus.publish("LOCATION_STATE_REFRESH_LOCATION", inputLocation)
            locationStateAlert("LOCATION_REFRESH_SUCCESS")
        } else{
            locationStateAlert("Error: 404 LOCATION_NOT_FOUND")
        }
        return
    }
    const deleteLocation=async function(inputLocation){
        const response=await backend.deleteLocation(inputLocation)
        if (!response.error){
            delete locationCache[inputLocation]
            locationStateUpdate()
            eventBus.publish("LOCATION_UI_SELECT_FIRST_OPTION")
            locationStateAlert(response.message)
        } else{
            locationStateError(response)
        }
        return
    }
    const deleteAllLocations=async function(){
        const response=await backend.deleteAllLocations()
        if (!response.error){
            locationCache={}
            locationStateUpdate()
            eventBus.publish("LOCATION_UI_SELECT_FIRST_OPTION")
            locationStateAlert(response.message)
        } else{
            locationStateError(response)
        }
        return
    }
    const locationStateUpdate=function(){
        eventBus.publish("LOCATION_STATE_UPDATE", retrieveState())
    }
    const locationStateAlert=function(alertMessage){
        eventBus.publish("LOCATION_STATE_ALERT", alertMessage)
    }
    const locationStateError=function(response){
        locationStateAlert(`Error: ${response.status} ${response.error}`)
    }
    const retrieveState=function(){
        return Object.keys(locationCache)
    }

    return{
        optionInitialisation,
        postLocation,
        getLocationObject,
        refreshLocationObject,
        deleteLocation,
        deleteAllLocations,
        retrieveState
        }
})()
export default state