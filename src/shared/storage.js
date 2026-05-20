const storage=(()=>{
    const localStorage=window.localStorage
    const initialisation=function(){
        if (localStorage.getItem("locations")===null){
            localStorage.setItem("locations", stringify({}))
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
    const postLocation=function(locationCollection){
        localStorage.setItem("locations", stringify(locationCollection))
    }
    const getLocationCollection=function(){
        return parse(localStorage.getItem("locations"))
    }
    const postEmail=function(emailCollection){
        localStorage.setItem("emails", stringify(emailCollection))
    }
    const getEmailCollection=function(){
        return parse(localStorage.getItem("emails"))
    }
    initialisation()
    console.log(getLocationCollection())
    console.log(getEmailCollection())
    return {postLocation, 
        getLocationCollection,
        postEmail,
        getEmailCollection
    }
})()
export default storage