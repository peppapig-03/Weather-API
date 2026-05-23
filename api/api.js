import utils from "../utils/utils.js"
const API=(function(){
    const fetchData=async (inputLocation)=>{
        const httpURL=utils.httpRequestMaker(inputLocation)
        let rawData
        try{   
            rawData=await fetch(httpURL)
        } catch(error) {
            const newError=new Error("API_FETCH_ERROR")
            newError.status=503
            throw newError
        }
        if (!rawData.ok){
            const errorMessages={
                "400":"BAD_REQUEST",
                "401":"UNAUTHORISED",
                "404":"NOT_FOUND",
                "429":"TOO_MANY_REQUESTS",
                "500":"API_SERVER_ERROR"
            }
            const newError=new Error(errorMessages[rawData.status.toString()])
            newError.status=rawData.status
            throw newError
        }
        try{
            const data=await rawData.json()
            return data
        } catch(error) {
            const newError=new Error("JSON_PARSE_ERROR")
            newError.status=502
            throw newError
        }
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
        try{
            const data=await fetchData(inputLocation)
            return {
                "locationName":dataResolvedLocationName(data),
                "temperature":dataTemp(data),
                "weather":dataWeatherConditions(data),
                "originalName":inputLocation
            }
        } catch(error){
            throw error
        }
        
    }
    return {fetchKeyData}
}())
export default API