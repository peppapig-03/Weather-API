import express from "express"
import subCon from "../controllers/subscriptionController.js" 

const emailRouter=express.Router()
emailRouter.post("/new", subCon.postNewEmail)
emailRouter.delete("/delete/all", subCon.deleteAllEmails)
emailRouter.delete("/delete/:email", subCon.deleteOneEmail)

export default emailRouter