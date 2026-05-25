import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./sql/pool.js"
import emailRouter from "./routers/emailRouter.js"
import locationRouter from "./routers/locationRouter.js"
import subscriptionRouter from "./routers/subscriptionRouter.js"
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
app.get("/", (req,res)=>{
    res.json({
        hi:"hi"
    })
})

