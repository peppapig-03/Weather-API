import express from "express"
import locationController from "../controllers/locationController.js"

const locationRouter=express.Router()

locationRouter.get("/all", locationController.getAll)
locationRouter.post("/new", locationController.postNew)
locationRouter.delete("/delete/all", locationController.deleteAll)
locationRouter.delete("/delete/:location", locationController.deleteOneLocation)
locationRouter.get("/:location", locationController.getOneLocation)

export default locationRouter