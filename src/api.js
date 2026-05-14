import httpRequestMaker from "./httpRequestMaker.js"
const API=(function(){
    const fetchData=async (inputPhrase)=>{
        const httpURL=httpRequestMaker(inputPhrase)
        let rawData=await fetch(httpURL)
        let data=await rawData.json()
        return data
    }
    return {fetchData}
}())
export default API