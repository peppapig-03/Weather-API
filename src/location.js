const location=function(inputLocationName){
    const name=inputLocationName
    const getName=()=>{
        return name
    }
    return {getName}
}
export default location