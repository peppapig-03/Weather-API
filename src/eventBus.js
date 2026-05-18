const eventBus=(function(){
    const events={}
    const subscribe=function(eventString,callbackFunction){
        if (!events[eventString]){
            events[eventString]=[]
        }
        events[eventString].push(callbackFunction)
    }
    const unsubscribe=function(eventString,callbackFunction){
        if (!events[eventString]){
            return
        } else {
            const index=events[eventString].findIndex((callbacks)=>{
                callbacks==callbackFunction
            })
            if (index==-1){
                return
            } else {
                events.splice(index,1)
            }
        }
    }
    const publish=function(eventString, data){
        if (events[eventString]){
            events[eventString].forEach((callbackFunction)=>{
                callbackFunction(data)
            })
        console.log(events)
        }
    }
    return {
        subscribe,
        publish,
        unsubscribe
    }
})()
export default eventBus