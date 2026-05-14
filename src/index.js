import "./styles.css"
import API from "./api.js"
import httpRequestMaker from "./httpRequestMaker.js"
const body=document.querySelector("body")
console.log(await API.fetchData("Kuala Lumpur"))
console.log(await API.fetchData("Pulau Pinang"))
console.log(await API.fetchData("Johor Bahru"))
console.log(await API.fetchData("Melaka Central"))