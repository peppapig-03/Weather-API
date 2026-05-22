import API from "../../api/api.js"
import storage from "../../shared/storage.js"
import eventBus from "../../shared/eventBus.js"
import backend from "./backend.js"
const state=(()=>{
    let locationList
    const dataInitialisation=async function(){
        try{
            locationList=await backend.fetchAllLocations()
        } catch(error){
            console.log(error)
        }
    }
    const optionInitialisation=async function(){
        await dataInitialisation()
        locationStateUpdate()
        emailStateUpdate()
    }  
    const addLocation=async function(inputLocation){
        try{
            const response=await backend.postLocation(inputLocation)
            return response.message
        } catch(error){
            alert(`Error: ${error.status} ${error.message}`) 
            throw error   
            /*eventBus.publish("LOCATION_STATE_ADD_LOCATION_ERROR","Invalid Address")
        */}
    }
    const getLocationObject=async function(inputLocation){
        try{
            const locationObject=await backend.getLocation(inputLocation)
            return locationObject
        } catch(error){
            alert(`Error: ${error.status} ${error.message}`)
            throw error
        }
    }
    const deleteLocation=async function(inputLocation){
        try{
            const response=await backend.deleteLocation(inputLocation)
            return response.message
        } catch(error){
            alert(`Error: ${error.status} ${error.message}`)
            throw error
        }
    }
    const deleteAllLocations=async function(){
        try{
            const response=await backend.deleteAllLocations()
            return response.message
        } catch(error){
            throw error
        }
    }
    const locationStateUpdate=function(){
        eventBus.publish("LOCATION_STATE_UPDATE", retrieveState().locations)
    }
    const retrieveState=function(){
        return {
            locations:structuredClone(Object.values(locationCollection)),
            emails:structuredClone(Object.values(emailCollection))
        }
    }

    return{
        optionInitialisation,
        addLocation,
        getLocationObject,
        deleteLocation,
        deleteAllLocations,
        retrieveState
        }
})()
export default state