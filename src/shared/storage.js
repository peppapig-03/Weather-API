const storage=(()=>{
    const localStorage=window.localStorage
    const initialisation=function(){
        if (localStorage.getItem("locations")===null){
            localStorage.setItem("locations", stringify([]))
        }
        if (localStorage.getItem("emails")===null){
            localStorage.setItem("emails",stringify([]))
        }
    }
    const stringify=function(array){
        return JSON.stringify(array)
    }
    const parse=function(string){
        return JSON.parse(string)
    }
    const postLocation=function(locationArray){
        localStorage.setItem("locations", stringify(locationArray))
    }
    const getLocationList=function(){
        return parse(localStorage.getItem("locations"))
    }
    const postEmail=function(emailArray){
        localStorage.setItem("emails", stringify(emailArray))
    }
    const getEmailList=function(){
        return parse(localStorage.getItem("emails"))
    }
    initialisation()
    return {postLocation, 
        getLocationList,
        postEmail,
        getEmailList
    }
})()
export default storage