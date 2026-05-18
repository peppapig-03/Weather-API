const storage=(()=>{
    const localStorage=window.localStorage
    const initialisation=function(){
        if (localStorage.getItem("locations")===null){
            localStorage.setItem("locations", stringify([]))
        }
        console.log(localStorage)
    }
    const stringify=function(array){
        return JSON.stringify(array)
    }
    const parse=function(string){
        return JSON.parse(string)
    }
    const post=function(locationArray){
        localStorage.setItem("locations", stringify(locationArray))
    }
    const get=function(){
        return {
            "locations":parse(localStorage.getItem("locations"))
        }
    }
    initialisation()
    return {post, get}
})()
export default storage