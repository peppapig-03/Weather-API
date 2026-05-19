import utils from "../utils/utils.js"
const API=(function(){
    const fetchData=async (inputLocation)=>{
        const httpURL=utils.httpRequestMaker(inputLocation)   
        let rawData=await fetch(httpURL)
        let data=await rawData.json()
        return data
    }
    const dataTemp=function(data){
        return data.currentConditions.temp
    }
    const dataWeatherConditions=function(data){
        return data.currentConditions.conditions
    }
    const dataResolvedLocationName=function(data){
        return utils.synthesiseAddress(data.resolvedAddress)
    }
    const fetchKeyData=async (inputLocation)=>{
        let data=await fetchData(inputLocation)
        return {
            "locationName":dataResolvedLocationName(data),
            "temperature":dataTemp(data),
            "weather":dataWeatherConditions(data),
            "originalName":inputLocation
        }
    }
    return {fetchKeyData}
}())
export default API