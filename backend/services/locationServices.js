import locRepo from "../repositories/locationRepository.js"
import eAPI from "../infrastructure/externalAPI.js"
const locationServices=(function(){
    const getOneWeatherData=async function(locationInput){
        const response=await eAPI.fetchKeyData(locationInput)
        return response
    }
    const locationValidation=async function(locationInput){
        const response=await locRepo.retrieveLocation(locationInput)
        if (response.length==0){
            const newError=new Error("LOCATION_NOT_FOUND")
            newError.status=404
            throw newError
        }
        return
    }
    const getAllLocations=async function(){
        const response=await locRepo.retrieveAllLocations()
        const data=response.map((rowObject)=>{
            return rowObject["originalname"]
        })
        return data
    }
    const getWeatherData=async function(locationArray){
        const responseObject={}
        let currentIndex=0
        const maxIndex=locationArray.length
        const worker=async function(){
            while(currentIndex<maxIndex){
                const index=currentIndex
                currentIndex++
                const currentLocation=locationArray[index]
                responseObject[currentLocation]=await eAPI.fetchKeyData(currentLocation)
            }
        }
        await Promise.all([
            worker(),
            worker()
        ])
        return responseObject
    }
    const postLocation=async function(locationInput){
        const weatherData=await getOneWeatherData(locationInput)
        await locRepo.insertLocation(locationInput)
        return weatherData
    }
    const deleteAll=async function(){
        await locRepo.deleteAllLocations()
        return
    }
    const deleteOneLocation=async function(locationInput){
        await locRepo.deleteLocation(locationInput)
        return
    }
    const getLocationID=async function(locationInput){
        const response=await locRepo.retrieveLocation(locationInput)
        return response[0]["id"]
    }
    return {
        getWeatherData,
        locationValidation,
        getOneWeatherData,
        getAllLocations,
        postLocation,
        deleteAll,
        deleteOneLocation,
        getLocationID
    }
})()
export default locationServices