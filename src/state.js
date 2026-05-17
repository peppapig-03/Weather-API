import API from "./api.js"
const state=(()=>{
    const locationList=[]
    const events={}
    const addLocationObject=async function(inputLocation){
        try{
            const keyDataObject=await API.fetchKeyData(inputLocation)
            console.log(keyDataObject)
            locationList.push(keyDataObject)
            publish("addLocationObject",keyDataObject)
        } catch(error){
            publish("addLocationObjectError","Invalid Address")
        }
    }
    const createStateInstance=function(){
        return [...locationList]
    }
    const printState=function(){
        console.log(createStateInstance())
        locationList.forEach((object)=>{
        console.log(object)
        })
    }
    const currentLocationCount=function(){
        return locationList.length
    }
    const subscribe=function(event,callback){
        if(!events[event]){
            events[event]=[]
        }
        events[event].push(callback)
    }    
    const unsubscribe=function(event,callback){
        if(!events[event]) return
        events[event]=events[event].filter((fn)=>fn!==callback)
    }
    const publish=function(event,data){
        if(!events[event]) return
        events[event].forEach((fn)=>{fn(data)})
    }
    const printEvents=function(){
        console.log(events)
        Object.entries(events).forEach(([key,value])=>{
            console.log(key,value)
        })
    }
    return {addLocationObject,
        printState,
        subscribe,
        unsubscribe,
        printEvents,
        publish
        }
})()
export default state