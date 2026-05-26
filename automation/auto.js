const emailAutomation=async function(){
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-GB')
    if (["07","08","11","12","15","16"].includes(timeString.slice(0,2))){
        const response=await fetch("https://weather-api-j6ya.onrender.com/sendemail/automate")
    }
    
}
emailAutomation()