import express from "express"
import pool from "../sql/pool.js"
import API from "../shared/api.js"
import utils from "../shared/utils.js" 
import middleware from "../shared/middleware.js"

const locationRouter=express.Router()

locationRouter.get("/all", 
    async (req,res,next)=>{
        try{
            const data=await pool.query(`SELECT * FROM locations ORDER BY id ASC`)
            req.allData=data.rows.map((locationRow)=>locationRow.originalname)
            next()
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"GET_ALL_LOCATIONS_ERROR"))
        }
    },
    async (req,res)=>{
        try{
            const allWeatherData={}
            for(const location of req.allData){
                const weatherData=await API.fetchKeyData(location)
                allWeatherData[location]=weatherData
            }
            res.json(utils.successfulJSON("GET_ALL_LOCATIONS_SUCCESS", allWeatherData))
        } catch(error) {
            console.log(error.status, error.message)
            res.status(error.status).json(utils.errorJSON(error.status,error.message))
        }
    }
)
locationRouter.post("/new", 
    async(req,res,next)=>{
        try{
            req.locationData={}
            req.locationData[req.body.originalName]=await API.fetchKeyData(req.body.originalName)
            console.log(req.locationData)
            next()
        } catch(error) {
            res.status(error.status).json(utils.errorJSON(error.status,error.message))
        }
    },
    async(req,res)=>{
    try{
        await pool.query(`INSERT INTO locations(originalName) VALUES ($1)`, [req.body.originalName])
        res.json(utils.successfulJSON("POST_LOCATION_SUCCESS", req.locationData))
    } catch(error){
        res.status(400).json(utils.errorJSON(400,"POST_LOCATION_ERROR"))
    }
})
locationRouter.delete("/delete/all", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM locations`)
        res.json(utils.successfulJSON("DELETE_ALL_LOCATIONS_SUCCESS"))
    } catch(error){
        res.status(500).json(utils.errorJSON(500,"DELETE_ALL_LOCATIONS_ERROR"))
    }
})
locationRouter.delete("/delete/:location", 
    async(req,res,next)=>{
        await middleware.locationValidation(req,res,next,req.params.location)
    },
    async (req,res)=>{
        try{
            await pool.query(`DELETE FROM locations WHERE originalName=$1`, [req.params.location])
            res.json(utils.successfulJSON("DELETE_LOCATION_SUCCESS"))
        } catch(error){
            res.status(400).json(utils.errorJSON(400,"DELETE_LOCATION_ERROR"))
        }
    }
)
locationRouter.get("/:location",
    async (req,res,next)=>{
        middleware.locationValidation(req,res,next,req.params.location)
    },
    async (req,res)=>{
        try{
            const weatherData={}
            weatherData[req.params.location]=await API.fetchKeyData(req.params.location)
            res.json(utils.successfulJSON("GET_LOCATION_SUCCESS",weatherData))
        } catch(error){
            res.status(error.status).json(utils.errorJSON(error.status,error.message))
        }
    }

)
const logAllLocations=async function(){
    const data=await pool.query("Select * from locations ORDER BY id ASC")
    console.log(data.rows)
}

export default locationRouter