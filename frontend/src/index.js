import locationPage from "./pages/location/locationPage.js"
import emailPage from "./pages/email/emailPage.js"


const getEmail=async function(emailAddress){
    const data=await fetch(`http://localhost:4000/emails/${emailAddress}`)
    const synth=await data.json()
    if (!synth.error){
        if (synth.length==0){
            console.log("Email Not Found")
        } else{
            console.log(synth)
            console.log(`Email: ${synth[0].emailaddress}, ID:${synth[0].id}`)
        }
    } else{
        console.log(synth.error)
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
        console.log(synth.error)
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
        console.log(synth.error)
    }
}
const getAllEmails=async function(){
    const data=await fetch(`http://localhost:4000/emails/all`)
    const synth=await data.json()
    if (!synth.error){
        if (synth.length==0){
            console.log("No Emails")
        } else{
            console.log(synth)
            synth.forEach((emailRow)=>{
                console.log(`Email: ${emailRow.emailaddress}, ID:${synth.id}`)
            })
        }
    } else{
        console.log(synth.error)
    }
}
const run=async function(){
    await postEmail("123@gmail")
    await getEmail("123@gmail")
    await getAllEmails()
    await deleteEmail("123@gmail")
    await getAllEmails()
}
run()
