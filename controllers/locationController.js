import locServ from "../services/locationServices.js"
import utils from "../shared/utils.js"
const locationController=(function(){
    const getAll=async function(req,res){
        try{
            const allLocations=await locServ.getAllLocations()
            const response=await locServ.getWeatherData(allLocations)
            res.json(utils.successfulJSON("GET_ALL_LOCATIONS_SUCCESS", response))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const postNew=async function(req,res){
        try{
            const weatherData=await locServ.postLocation(req.body.originalName)
            const responseObj={}
            responseObj[req.body.originalName]=weatherData
            res.json(utils.successfulJSON("POST_LOCATION_SUCCESS", responseObj))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteAll=async function(req, res){
        try{
            await locServ.deleteAll()
            res.json(utils.successfulJSON("DELETE_ALL_LOCATIONS_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const deleteOneLocation=async function(req, res){
        try{
            const location=req.params.location
            await locServ.locationValidation(location)
            await locServ.deleteOneLocation(location)
            res.json(utils.successfulJSON("DELETE_LOCATION_SUCCESS"))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    const getOneLocation=async function(req,res){
        try{
            const location=req.params.location
            await locServ.locationValidation(location)
            const response={}
            response[location]=await locServ.getOneWeatherData(location)
            res.json(utils.successfulJSON("GET_LOCATION_SUCCESS", response))
            return
        } catch(error){
            res.status(error.status||500).json(utils.errorJSON(error.status||500, error.message))
            return
        }
    }
    return {
        getAll,
        postNew,
        deleteAll,
        deleteOneLocation,
        getOneLocation
    }
})()
export default locationController