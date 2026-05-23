import express from "express"
import pool from "../sql/pool.js"

const emailRouter=express.Router()
emailRouter.post("/new", async(req,res)=>{
    try{
        await pool.query(`INSERT INTO emails(emailAddress) VALUES ($1)`, [req.body.emailAddress])
        res.json({
            message:"POST_EMAIL_SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            status:500,
            error:"POST_EMAIL_ERROR"
        })
    }
})
emailRouter.delete("/delete/all", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM emails`)
        res.json({
            message:"DELETE_ALL_EMAILS_SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            status:500,
            error:"DELETE_ALL_EMAILS_ERROR"
        })
    }
})
emailRouter.delete("/delete/:email", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM emails WHERE emailAddress=$1`, [req.params.email])
        res.json({
            message:"DELETE_EMAIL_SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            status:500,
            error:"DELETE_EMAIL_ERROR"
        })
    }
})




export default emailRouter