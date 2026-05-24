import express from "express"
import pool from "../sql/pool.js"
import utils from "../shared/utils.js"
import middleware from "../shared/middleware.js"

const emailRouter=express.Router()
emailRouter.post("/new", async(req,res)=>{
    try{
        await pool.query(`INSERT INTO emails(emailAddress) VALUES ($1)`, [req.body.emailAddress])
        res.json(utils.successfulJSON("POST_EMAIL_SUCCESS"))
    } catch(error){
        res.status(500).json(utils.errorJSON(500,"POST_EMAIL_ERROR"))
    }
})
emailRouter.delete("/delete/all", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM emails`)
        res.json(utils.successfulJSON("DELETE_ALL_EMAILS_SUCCESS"))
    } catch(error){
        res.status(500).json(utils.errorJSON(500,"DELETE_ALL_EMAILS_ERROR"))
    }
})
emailRouter.delete("/delete/:email", 
    async(req,res,next)=>{
        await middleware.emailValidation(req,res,next,req.params.email)
    },
    async (req,res)=>{
        try{
            await pool.query(`DELETE FROM emails WHERE emailAddress=$1`, [req.params.email])
            res.json(utils.successfulJSON("DELETE_EMAIL_SUCCESS"))
        } catch(error){
            res.status(500).json(utils.errorJSON(500,"DELETE_EMAIL_ERROR"))
        }
    }
)




export default emailRouter