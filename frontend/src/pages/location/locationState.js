import eventBus from "../../shared/eventBus.js"
import backend from "./locationBackend.js"
const state=(()=>{
    let locationCache
    const dataInitialisation=async function(){
        try{
            locationCache=await backend.fetchAllLocations()
        } catch(error){
           locationStateAlert(`Error: ${error.status} ${error.message}`)
        }
    }
    const optionInitialisation=async function(){
        await dataInitialisation()
        locationStateUpdate()
    }  
    const postLocation=async function(inputLocation){
        try{
            const response=await backend.postLocation(inputLocation)
            locationCache.push(await backend.getLocation(inputLocation))
            locationStateUpdate()
            eventBus.publish("LOCATION_STATE_POST_LOCATION",inputLocation)
            return
        } catch(error){
            locationStateAlert(`Error: ${error.status} ${error.message}`)
            return
        }
    }
    const getLocationObject=async function(inputLocation){
        const locationObject=locationCache.find((locationObject)=>{
            return locationObject.originalName==inputLocation
        })
        if (locationObject!=undefined){
            eventBus.publish(`LOCATION_STATE_GET_LOCATION_OBJECT`,locationObject)
            return
        } else{
            locationStateAlert(`Error: 404 LOCATION_NOT_FOUND`)
            return
        }
    }
    const refreshLocationObject=async function(inputLocation){
        const originalLocationIndex=locationCache.findIndex((locationObject)=>{
            return locationObject.originalName==inputLocation
        })
        if (originalLocationIndex!=-1){
            try{
                const newLocationObject=await backend.getLocation(inputLocation)
                locationCache[originalLocationIndex]=newLocationObject
                eventBus.publish("LOCATION_STATE_REFRESH_LOCATION", inputLocation)
                locationStateAlert("LOCATION_REFRESH_SUCCESS")
            } catch(error){
                locationStateAlert(`Error: ${error.status} ${error.message}`)
            }

        }else{
            locationStateAlert(`Error: 404 LOCATION_NOT_FOUND`)
            return
        }
    }
    const deleteLocation=async function(inputLocation){
        try{
            const response=await backend.deleteLocation(inputLocation)
            console.log(inputLocation)
            locationCache=locationCache.filter((locationObject)=>locationObject.originalName!==inputLocation)
            locationStateUpdate()
            eventBus.publish("LOCATION_UI_SELECT_FIRST_OPTION")
            locationStateAlert(response.message)
            return
        } catch(error){
            locationStateAlert(`Error: ${error.status} ${error.message}`)
            return
        }
    }
    const deleteAllLocations=async function(){
        try{
            const response=await backend.deleteAllLocations()
            locationCache=[]
            locationStateUpdate()
            eventBus.publish("LOCATION_UI_SELECT_FIRST_OPTION")
            locationStateAlert(response.message)
            return
        } catch(error){
            locationStateAlert(`Error: ${error.status} ${error.message}`)
            return
        }
    }
    const locationStateUpdate=function(){
        eventBus.publish("LOCATION_STATE_UPDATE", retrieveState())
    }
    const locationStateAlert=function(alertMessage){
        eventBus.publish("LOCATION_STATE_ALERT", alertMessage)
    }
    const retrieveState=function(){
        console.log(locationCache)
        return locationCache.map((locationObject)=>{
                return locationObject.originalName
            })
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