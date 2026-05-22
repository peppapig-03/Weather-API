import locationPage from "./pages/location/locationPage.js"
import emailPage from "./pages/email/emailPage.js"
import backend from "./pages/location/backend.js"
import state from "./pages/location/state.js"
/*
const getEmail=async function(emailAddress){
    const data=await fetch(`http://localhost:4000/emails/${emailAddress}`)
    const synth=await data.json()
    if (!synth.error){
        if (synth.length==0){
            console.log("Email Not Found")
        } else{
            console.log(`Email: ${synth[0].emailaddress}, ID:${synth[0].id}`)
        }
    } else{
        console.error(synth.error)
    }
}
const postEmail=async function(emailAddress){
    const data=await fetch("http://localhost:4000/emails/new", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({emailAddress:emailAddress},null,2)
    })
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
    } else{
        console.error(synth.error)
    }
}
const deleteEmail=async function(emailAddress){
    const data=await fetch(`http://localhost:4000/emails/delete/${emailAddress}`,{
        method:"DELETE"
    })
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
    } else{
        console.error(synth.error)
    }
}
const getAllEmails=async function(){
    const data=await fetch(`http://localhost:4000/emails/all`)
    const synth=await data.json()
    if (!synth.error){
        if (synth.length==0){
            console.log("No Emails")
        } else{
            synth.forEach((emailRow)=>{
                console.log(`Email: ${emailRow.emailaddress}, ID:${emailRow.id}`)
            })
        }
    } else{
        console.error(synth.error)
    }
}
const getLocation=async function(originalName){
    const data=await fetch(`http://localhost:4000/locations/${originalName}`)
    const synth=await data.json()
    if (!synth.error){
        if (synth.length==0){
            console.log("Location Not Found")
        } else{
            console.log(`Location: ${synth[0].originalname}, ID:${synth[0].id}`)
        }
    } else{
        console.error(synth.error)
    }
}
const postLocation=async function(originalName){
    const data=await fetch("http://localhost:4000/locations/new", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({originalName:originalName},null,2)
    })
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
    } else{
        console.error(synth.error)
    }
}
const deleteLocation=async function(originalName){
    const data=await fetch(`http://localhost:4000/locations/delete/${originalName}`,{
        method:"DELETE"
    })
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
    } else{
        console.error(synth.error)
    }
}
const getAllLocations=async function(){
    const data=await fetch(`http://localhost:4000/locations/all`)
    const synth=await data.json()
    if (!synth.error){
        if (synth.length==0){
            console.log("No Locations")
        } else{
            synth.forEach((locationRow)=>{
                console.log(`Location: ${locationRow.originalname}, ID:${locationRow.id}`)
            })
        }
    } else{
        console.error(synth.error)
    }
}
*/
const run = async function(){
    try{
        console.log(await backend.fetchAllLocations())
        console.log(await state.addLocation("Bandar Utama"))
        console.log(await state.addLocation("Toa Payoh"))
        console.log(await state.addLocation("Singapore"))
        console.log(await backend.fetchAllLocations())
        console.log(await state.deleteLocation("Singapore"))
        console.log(await backend.fetchAllLocations())
        console.log(await state.getLocationObject("Toa Payoh"))
        console.log(await state.deleteAllLocations())
        console.log(await backend.fetchAllLocations())
    } catch(error){
        console.error(`Error: ${error.status} ${error.message}`)
    }
}
run()