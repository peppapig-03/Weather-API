import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import emailRouter from "./routers/emailRouter.js"
import locationRouter from "./routers/locationRouter.js"
import subscriptionRouter from "./routers/subscriptionRouter.js"
import sendEmailRouter from "./routers/sendEmailRouter.js"
dotenv.config()

const app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const port=process.env.PORT||4000
app.listen(port)
app.use("/emails/", emailRouter)
app.use("/locations/", locationRouter)
app.use("/subscriptions/", subscriptionRouter)
app.use("/sendemail/", sendEmailRouter)
app.get("/health",(req,res)=>{
    res.send("Healthy")
})