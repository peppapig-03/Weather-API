import express from "express"
import cors from "cors"
import fs from "node:fs"
const app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(4000)
app.get("/users/:name", (req,res)=>{
    try{
        const data=searchInDatabase("./data/dataBase.json", req.params.name)
        res.json({
            message:"Read Success",
            user:data
        })
    } catch (error){
        res.status(500).json({
            error:"Read Error"
        })
    }
})
app.post("/users/new", (req,res)=>{
    try{
        writeInDatabase("./data/dataBase.json", req.body)
        res.json({
            message:"Creation Success",
            user:req.body
        })
    } catch(error){
        res.status(500).json({
            error:"Creation Error"
        })
    }
})
app.delete("/users/:name",(req,res)=>{
    try{
        const data=searchInDatabase("./data/dataBase.json", req.params.name)
        removeFromDatabase("./data/dataBase.json", req.params.name)
        res.json({
            message:"Delete Success",
            user:data
        })
    } catch(error){
        res.status(500).json({
            error: "Delete Error"
        })
    }
})
const retrieveDatabase=function(locationString){
    const rawData=fs.readFileSync(locationString, "utf-8")
    const parsedData=JSON.parse(rawData)
    return parsedData
}
const writeInDatabase=function(locationString, reqBody){
    const currentData=retrieveDatabase(locationString)
    currentData["users"].push(reqBody)
    const currentJSON=JSON.stringify(currentData,null,2)
    fs.writeFileSync(locationString, currentJSON)
}
const searchInDatabase=function(locationString, userName){
    const allData=retrieveDatabase(locationString)
    if (allData["users"].find((user)=>user["name"]===userName)==undefined){
        throw new Error("No Such User Found")
    } else{
        return allData["users"].find((user)=>user["name"]===userName)
    }
}
const removeFromDatabase=function(locationString, userName){
    try{
        const user=searchInDatabase(locationString, userName)
        const currentData=retrieveDatabase(locationString)
        currentData["users"]=currentData["users"].filter((userObj)=>{return ((userObj.name)!=user.name)||(userObj.age!=user.age)})
        const currentJSON=JSON.stringify(currentData,null,2)
        fs.writeFileSync(locationString, currentJSON)
    } catch (error){
        console.log(0)
        throw new Error
    }
}