import API from "./api.js"
import storage from "./storage.js"
const state=(()=>{
    const locationList=storage.get().locations
    const events={}
    const initialisation=function(){
        publish("stateInitialisation", "initialisation" )
    }
    const addLocationObject=async function(inputLocation){
        if (detectDuplicateLocation(inputLocation)==true){
            publish ("addLocationObjectError", "Address already exists")
            return
        } else{
            try{
                const keyDataObject=await API.fetchKeyData(inputLocation)
                console.log(keyDataObject)
                locationList.push(keyDataObject)
                storage.post(locationList)
                publish("addLocationObject",keyDataObject)
            } catch(error){
                publish("addLocationObjectError","Invalid Address")
            }
        }
    }
    const wholeStatePublisher=function(){
        publish("wholeStateUpdate",createStateInstance())
    }
    const createStateInstance=function(){
        return [...locationList]
    }
    const getSpecificLocationObject=function(locationNameString){
        const specificLocationObjectArray=locationList.filter((location)=>{
            return location.originalName===locationNameString
        })
        if (specificLocationObjectArray.length==1){
            return specificLocationObjectArray[0]
        } else{
            return "Error"
        }
    }
    const detectDuplicateLocation=function(locationNameString){
        if(locationList.find(location=>location.originalName==locationNameString)!=undefined){
            return true
        } else{
            return false
        }
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
    const retrieveState=function(){
        return createStateInstance()
    }
    subscribe("addLocationObject", wholeStatePublisher)
    subscribe("stateInitialisation", wholeStatePublisher)
    return {addLocationObject,
        subscribe,
        unsubscribe,
        publish,
        wholeStatePublisher,
        retrieveState,
        getSpecificLocationObject,
        initialisation
        }
})()
export default state