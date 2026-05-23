import express from "express"
import pool from "../sql/pool.js"
import API from "../api/api.js"

const locationRouter=express.Router()

locationRouter.get("/all", 
    async (req,res,next)=>{
        try{
            const data=await pool.query(`SELECT * FROM locations`)
            req.allData=data.rows.map((locationRow)=>locationRow.originalname)
            next()
        } catch(error){
            res.status(500).json({
                status:500,
                error:"GET_ALL_LOCATIONS_ERROR"
            })
        }
    },
    async (req,res)=>{
        try{
            console.log(req.allData)
            const allWeatherData=await Promise.all(
                req.allData.map(async (locationName)=>{
                    const weatherData=await API.fetchKeyData(locationName)
                    return weatherData
                })
            )
            console.log(allWeatherData)
            res.json(allWeatherData)
        } catch(error) {
            res.status(error.status).json({
                status:error.status,
                error:error.message
            })
        }
    }
)
locationRouter.post("/new", 
    async(req,res,next)=>{
        try{
            await API.fetchKeyData(req.body.originalName)
            next()
        } catch(error) {
            console.log(error.message, error.status)
            res.status(error.status).json({
                status:error.status,
                error:error.message
            })
        }
    },
    async(req,res)=>{
    try{
        await pool.query(`INSERT INTO locations(originalName) VALUES ($1)`, [req.body.originalName])
        res.json({
            message:"POST_LOCATION_SUCCESS"
        })
    } catch(error){
        res.status(400).json({
            status:400,
            error:"POST_LOCATION_ERROR"
        })
    }
})
locationRouter.delete("/delete/all", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM locations`)
        res.json({
            message:"DELETE_ALL_LOCATIONS_SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            status:500,
            error:"DELETE_ALL_LOCATIONS_ERROR"
        })
    }
})
locationRouter.delete("/delete/:location", async(req,res)=>{
    try{
        console.log(req.originalUrl)
        await pool.query(`DELETE FROM locations WHERE originalName=$1`, [req.params.location])
        logAllLocations()
        res.json({
            message:"DELETE_LOCATION_SUCCESS"
        })
    } catch(error){
        res.status(400).json({
            status:400,
            error:"DELETE_LOCATION_ERROR"
        })
    }
})
locationRouter.get("/:location",
    async (req,res,next)=>{
        try{
            const data=await pool.query(`SELECT * FROM locations WHERE originalName=$1`,[req.params.location])
            if (data.rowCount==0){
                res.status(404).json({
                    status:404,
                    error:"LOCATION_NOT_FOUND"
                })
            } else {
                logAllLocations()
                next()
            }
        } catch(error){
            res.status(500).json({
                status:500,
                error:"GET_LOCATION_ERROR"
            })
        }
    },
    async (req,res)=>{
        try{
            const weatherData=await API.fetchKeyData(req.params.location)
            res.json(weatherData)
        } catch(error){
            res.status(error.status).json({
                status:error.status,
                error:error.message
            })
        }
    }

)
const logAllLocations=async function(){
    const data=await pool.query("Select * from locations")
    console.log(data.rows)
}

export default locationRouter