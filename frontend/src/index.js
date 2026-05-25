import locationPage from "./pages/location/locationPage.js"
import uiCreation from "./shared/uiCreation.js"
import emailPage from "./pages/email/emailPage.js"
import config from "./shared/config.js"
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
        footerButton.textContent="EMAILS"
        footerButton.addEventListener("click",(event)=>{
            spawnEmailPage()
        })
    } else{
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
const test=function(input){
    if (input%2==0){
        return input
    } else{
        throw Error;
    }
}
run()