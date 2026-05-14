function httpRequestMaker(inputPhrase){
    const httpPhrase=inputPhrase.split(" ").join("%20")
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${httpPhrase}/?unitGroup=metric&key=DG3J54RLAVLUM2EPNYU2DDP68&contentType=json`
}
export default httpRequestMaker