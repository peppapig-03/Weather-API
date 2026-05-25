import express from "express"
import subCon from "../controllers/subscriptionController.js"
const subscriptionRouter=express.Router()

subscriptionRouter.get("/all", subCon.getAllSubscriptions)
subscriptionRouter.get("/allLocations", subCon.getAllLocations)
subscriptionRouter.get("/:email", subCon.getSubscriptionsForFrontend)
subscriptionRouter.post("/new", subCon.postNewSubscription)
subscriptionRouter.delete("/delete/all", subCon.deleteAllSubscriptions)
subscriptionRouter.delete("/delete/:email/all", subCon.deleteAllSubscriptionsFromEmail)
subscriptionRouter.delete("delete/:email/:location", subCon.deleteSubscription)

export default subscriptionRouter