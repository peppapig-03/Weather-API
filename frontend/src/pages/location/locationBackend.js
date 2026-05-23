const backend=(function(){
    const fetchAllLocations=async function(){
        try{
            const data=await fetch(`http://localhost:4000/locations/all`)
            const synth=await data.json()
            if (!synth.error){
                return synth
            } else{
                throw new Error(synth.error)
            }
        } catch(error){
            const newError=new Error("BACKEND_SERVER_ERROR")
            newError.status=500
            throw newError
        }
    }
    const postLocation=async function(locationName){
        const data=await fetch("http://localhost:4000/locations/new", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({originalName:locationName},null,2)
            })
        const synth=await data.json()
        if (!synth.error){
            return synth
        } else{
            const newError=new Error(synth.error)
            newError.status=parseInt(synth.status)
            throw newError
        }
    }
    const getLocation=async function(locationName){
        const data=await fetch(`http://localhost:4000/locations/${locationName}`)
        const synth=await data.json()
        if (!synth.error){
            return synth
        } else{
            const newError=new Error(synth.error)
            newError.status=synth.status
            throw newError
        }
    }
    const deleteLocation=async function(locationName){
        const data=await fetch(`http://localhost:4000/locations/delete/${locationName}`,{
            method:"DELETE"
        })
        const synth=await data.json()
        if (!synth.error){
            return {
                message:"DELETE_SUCCESS"
            }
        } else{
            const newError=new Error(synth.error)
            newError.status=synth.status
            throw newError
        }
    }
    const deleteAllLocations=async function(){
        const data=await fetch("http://localhost:4000/locations/delete/all",{
            method:"DELETE"
        })
        const synth=await data.json()
        if (!synth.error){
            return synth
        } else{
            const newError=new Error(synth.error)
            newError.status=synth.status
            throw newError
        }
    }
    return {
        fetchAllLocations,
        postLocation,
        getLocation,
        deleteLocation,
        deleteAllLocations
    }
})()

export default backend