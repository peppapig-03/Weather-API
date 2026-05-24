import express from "express"
import pool from "../sql/pool.js"
import utils from "../shared/utils.js"
import middleware from "../shared/middleware.js"

const subscriptionRouter=express.Router()

subscriptionRouter.get("/all", 
    async (req,res)=>{
        try{
            const data=await pool.query(`SELECT E.emailaddress, L.originalname FROM emails as E 
                LEFT JOIN subscriptions as S 
                ON E.id=S.email_id 
                LEFT JOIN locations as L 
                ON L.id=S.location_id
                ORDER BY S.email_id ASC, S.location_id ASC`)
            const dataHash={}
            data.rows.forEach((dataRow)=>{
                const emailAddress=dataRow["emailaddress"]
                const locationName=dataRow["originalname"]
                if (!dataHash[emailAddress]){
                    dataHash[emailAddress]=[]
                }
                if (locationName){
                    dataHash[emailAddress].push(locationName)
                }
            })
            res.json(utils.successfulJSON("GET_ALL_SUBSCRIPTIONS_SUCCESS", dataHash))
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"GET_ALL_SUBSCRIPTIONS_ERROR"))
        }
    }
)
subscriptionRouter.get("/allLocations",
    async (req,res)=>{
        try{
            const data=await pool.query(`SELECT originalName FROM locations ORDER BY id ASC`)
            const synth=data.rows.map((rowObject)=>{
                return rowObject["originalname"]
            })
            res.json(utils.successfulJSON("GET_ALL_LOCATIONS_SUCCESS", synth))
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"GET_ALL_LOCATIONS_ERROR"))
        }
    }
)
subscriptionRouter.get("/:email", 
    async (req,res,next)=>{
        await middleware.emailValidation(req,res,next,req.params.email)
    },
    async (req,res)=>{
        try{
            const data=await pool.query(`SELECT L.originalname FROM emails as E 
            INNER JOIN subscriptions as S 
            ON E.id=S.email_id 
            INNER JOIN locations as L 
            ON L.id=S.location_id
            WHERE E.emailaddress=$1
            ORDER BY S.location_id ASC`, [req.params.email])
            const responseArray=data.rows.map((dataRow)=>{
                return dataRow["originalname"]
            })
            const dataHash={}
            dataHash[req.params.email]=responseArray
            res.json(utils.successfulJSON("GET_SUBSCRIPTION_SUCCESS",dataHash))
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"GET_SUBSCRIPTION_ERROR"))
        }
    }
)
subscriptionRouter.post("/new", 
    async (req,res,next)=>{
        await middleware.emailValidation(req,res,next,req.body.emailAddress)
    },
    async (req,res,next)=>{
        await middleware.locationValidation(req,res,next,req.body.locationName)
    },
    async (req,res)=>{
        try{
            await pool.query(`INSERT INTO subscriptions(email_id, location_id) VALUES($1, $2)`, [req.emailID, req.locationID])
            res.json(utils.successfulJSON("POST_SUBSCRIPTION_SUCCESS"))
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"POST_SUBSCRIPTION_ERROR"))
        }
    }
)
subscriptionRouter.delete("/delete/all",
    async (req,res)=>{
        try{
            await pool.query("DELETE FROM subscriptions")
            res.json(utils.successfulJSON("DELETE_ALL_SUBSCRIPTIONS_SUCCESS"))
        } catch(error){
            res.status(500).json(utils.errorJSON(500, "DELETE_ALL_SUBSCRIPTIONS_ERROR"))
        }
    }
)
subscriptionRouter.delete("/delete/:email/all",
    async (req,res,next)=>{
        await middleware.emailValidation(req,res,next,req.params.email)
    },
    async (req,res)=>{
        try{
            await pool.query("DELETE FROM subscriptions WHERE email_id=$1", [req.emailID])
            res.json(utils.successfulJSON("DELETE_ALL_SUBSCRIPTIONS_FROM_EMAIL_SUCCESS"))
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"DELETE_ALL_SUBSCRIPTIONS_FROM_EMAIL_ERROR"))
        }
    } 
)
subscriptionRouter.delete("/delete/:email/:location",
    async (req,res,next)=>{
        await middleware.emailValidation(req,res,next,req.params.email)
    },
    async (req,res,next)=>{
        await middleware.locationValidation(req,res,next,req.params.location)
    },
    async (req,res)=>{
        try{
            await pool.query("DELETE FROM subscriptions WHERE email_id=$1 and location_id=$2", [req.emailID, req.locationID]) 
            res.json(utils.successfulJSON("DELETE_SUBSCRIPTION_SUCCESS"))
        } catch(error){
            res.status(404).json(utils.errorJSON(404,"DELETE_SUBSCRIPTION_ERROR"))
        }
    }
)

export default subscriptionRouter