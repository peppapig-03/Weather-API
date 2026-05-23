import locationPage from "./pages/location/locationPage.js"
import uiCreation from "./shared/uiCreation.js"
const footer=document.querySelector("footer")
const clearFooter=function(){
    while(footer.firstElementChild){
        footer.removeChild(footer.lastElementChild)
    }
}
const spawnFooterButton=function(){
    const footerButton=uiCreation.createFooterButton()
    footer.appendChild(footerButton)
    if(locationPage.presence()==true){
        console.log(locationPage.presence())
        footerButton.textContent="EMAILS"
        footerButton.addEventListener("click",(event)=>{
            spawnEmailPage()
        })
    } else{
        console.log(locationPage.presence())
        footerButton.textContent="LOCATIONS"
        footerButton.addEventListener("click", (event)=>{
            spawnLocationPage()
        })
    }
}
const spawnLocationPage=function(){
    clearFooter()
    locationPage.despawn()
    locationPage.spawn()
    spawnFooterButton()
}
const spawnEmailPage=function(){
    clearFooter()
    locationPage.despawn()
    spawnFooterButton()
}
const run=function(){
    spawnLocationPage()
}
run()
/*import emailPage from "./pages/email/emailPage.js"*/
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
