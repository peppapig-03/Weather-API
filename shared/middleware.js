import pool from "../sql/pool.js"
import utils from "./utils.js"
const middleware=(function(){
    const emailHandler=async function(req,res,next,emailAddress){
        try{
            const data=await pool.query("SELECT id from emails where emailaddress=$1", [emailAddress])
            if (data.rowCount==0){
                res.status(404).json(utils.errorJSON(404,"EMAIL_NOT_FOUND"))
            } else{
                req.emailID=data.rows[0]["id"]
                next()
            }
        } catch(error){
            res.status(500).json(utils.errorJSON(500, "GET_EMAIL_ERROR"))
        }
    }
    const locationHandler=async function(req,res,next,locationName){
        try{
            const data=await pool.query("SELECT id from locations where originalname=$1", [locationName])
            if (data.rowCount==0){
                res.status(404).json(utils.errorJSON(404,"LOCATION_NOT_FOUND"))
            } else{
                req.locationID=data.rows[0]["id"]
                next()
            }
        } catch(error){
            res.status(500).json(utils.errorJSON("GET_LOCATION_ERROR"))
        }
    }
    return {
        emailHandler,
        locationHandler
    }
})()
export default middleware