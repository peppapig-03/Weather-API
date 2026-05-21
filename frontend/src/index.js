import locationPage from "./pages/location/locationPage.js"
import emailPage from "./pages/email/emailPage.js"
const fetchLocal=async function(userName){
    const data=await fetch(`http://localhost:4000/users/${userName}`)
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
        console.log(synth.user)
    } else{
        console.log(synth.error)
    }
}
const postLocal=async function(name, age){
    const data=await fetch("http://localhost:4000/users/new", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name:name, age:age},null,2)
    })
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
        console.log(synth.user)
    } else{
        console.log(synth.error)
    }
}
const deleteLocal=async function(name){
    const data=await fetch(`http://localhost:4000/users/${name}`,{
        method:"DELETE"
    })
    const synth=await data.json()
    if (!synth.error){
        console.log(synth.message)
        console.log(synth.user)
    } else{
        console.log(synth.error)
    }
}
const run=async function(){
    await postLocal("HANHAN", 12)
    await fetchLocal("HANHAN")
    /*await deleteLocal("HANHAN")*/
}
run()
