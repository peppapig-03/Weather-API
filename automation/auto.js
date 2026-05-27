const emailAutomation=async function(){
    const response=await fetch('https://weather-api-4pxd.onrender.com/sendemail/automate?key=BZER*@2kUv.VVk')
    console.log(await response.json())
}
emailAutomation()