import express from "express"
import sendEmailController from "../controllers/sendEmailController.js"
const sendEmailRouter=express.Router()
sendEmailRouter.get("/:email", async (req,res)=>{
    sendEmailController(req,res)
})
export default sendEmailRouter