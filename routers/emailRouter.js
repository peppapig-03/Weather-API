import express from "express"
import pool from "../sql/pool.js"

const emailRouter=express.Router()

emailRouter.get("/all", async (req,res)=>{
    try{
        const data=await pool.query(`SELECT * FROM emails`)
        res.json(data.rows)
    } catch(error){
        res.status(500).json({
            error:"GET ERROR"
        })
    }
})
emailRouter.post("/new", async(req,res)=>{
    try{
        await pool.query(`INSERT INTO emails(emailAddress) VALUES ($1)`, [req.body.emailAddress])
        res.json({
            message:"POST SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            error:"POST ERROR"
        })
    }
})
emailRouter.delete("/delete/all", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM emails`)
        res.json({
            message:"DELETE ALL SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            error:"DELETE ALL ERROR"
        })
    }
})
emailRouter.delete("/delete/:email", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM emails WHERE emailAddress=$1`, [req.params.email])
        res.json({
            message:"DELETE SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            error:"DELETE ERROR"
        })
    }
})
emailRouter.get("/:email", async (req,res)=>{
    try{
        const data=await pool.query(`SELECT * FROM emails WHERE emailAddress=$1`,[req.params.email])
        if (data.rowCount==0){
            res.status(500).json({
                error:"Email is not in database"
            })
        } else{
            res.json(data.rows)
        }
    } catch(error){
        res.status(500).json({
            error:"GET ERROR"
        })
    }
})



export default emailRouter