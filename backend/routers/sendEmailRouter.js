import express from "express"
import sendEmailController from "../controllers/sendEmailController.js"
const sendEmailRouter=express.Router()
sendEmailRouter.get("/automate", sendEmailController.sendAllEmails)
sendEmailRouter.get('/trigger', sendEmailController.triggerEmails)
sendEmailRouter.get("/test", sendEmailController.testAllEmails)
sendEmailRouter.get("/:email", sendEmailController.sendOneEmail)
export default sendEmailRouter