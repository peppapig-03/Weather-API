import utils from "../shared/utils.js"
const API=(function(){
    const fetchData=async (inputLocation)=>{
        const httpURL=utils.httpRequestMaker(inputLocation)
        let rawData
        try{   
            rawData=await fetch(httpURL)
        } catch(error) {
            const newError=new Error("EXTERNAL_API_GET_ERROR")
            newError.status=500
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
            return utils.errorJSON(502, "JSON_PARSE_ERROR")
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
        const data=await fetchData(inputLocation)
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