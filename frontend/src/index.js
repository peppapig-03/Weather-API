import locationPage from "./pages/location/locationPage.js"
import uiCreation from "./shared/uiCreation.js"
import backend from "./pages/email/emailBackend.js"
import state from "./pages/email/emailState.js"
import emailPage from "./pages/email/emailPage.js"
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
    emailPage.despawn()
    locationPage.spawn()
    spawnFooterButton()
}
const spawnEmailPage=function(){
    clearFooter()
    locationPage.despawn()
    emailPage.despawn()
    emailPage.spawn()
    spawnFooterButton()
}
const run=function(){
    spawnLocationPage()
}
const test=async function(){
    try{
        console.log(await backend.fetchAllEmails())
        console.log(await backend.getEmailSubscriptions("gmail@gmail"))
        console.log(await backend.deleteSubscriptionFromEmail("haha@gmail", "Shah Alam"))
        console.log(await backend.fetchAllEmails())
    } catch(error){
        console.error(error)
    }
} 
const test2=async function(){
    console.log(await backend.fetchAllEmails())
    console.log(await backend.getEmailSubscriptions("HANHAN@gmail"))
    console.log(await backend.getEmailSubscriptions(11))
    console.log(await backend.getEmailSubscriptions("gmail@gmai"))
    console.log(await backend.deleteAllSubscriptionsFromEmail("qiqi@gmail"))
    console.log(await backend.deleteEmail("11"))
    console.log(await backend.fetchAllEmails())
}
run()

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
}}
*/
