const emailAutomation=async function(){
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-GB')
    if (["07","08","09","11","12","15","16"].includes(timeString.slice(0,2))){
        const link="http://localhost:4000/sendemail/automate"||"https://weather-api-j6ya.onrender.com/sendemail/automate"
        console.log(link)
        const response=await fetch(link)
    }
    
}
emailAutomation()