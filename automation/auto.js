const emailAutomation=async function(){
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-GB')
    console.log(timeString)
    if (["07","08","09","11","12","15","16"].includes(timeString.slice(0,2))){
        console.log("https://weather-api-j6ya.onrender.com/sendemail/automate")
        const response=await fetch(link)
    }
    
}
emailAutomation()