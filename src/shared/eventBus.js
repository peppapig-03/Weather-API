const eventBus=(function(){
    let events={}
    const subscribe=function(eventString,callbackFunction){
        if (!events[eventString]){
            events[eventString]=[]
        }
        if (events[eventString].includes(callbackFunction)==false){
            events[eventString].push(callbackFunction)
        }
        return [eventString, callbackFunction]
    }
    const unsubscribe=function(eventString,callbackFunction){
        if (!events[eventString]){
            return
        } else {
            const index=events[eventString].findIndex((callbacks)=>{
                return callbacks==callbackFunction
            })
            if (index==-1){
                return
            } else {
                events[eventString].splice(index,1)
            }
        }
    }
    const publish=function(eventString, data){
        if (events[eventString]){
            events[eventString].forEach((callbackFunction)=>{
                callbackFunction(data)
            })
        }
    }
    return {
        subscribe,
        publish,
        unsubscribe
    }
})()
export default eventBus