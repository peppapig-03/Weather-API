import express from "express"
import pool from "../sql/pool.js"

const locationRouter=express.Router()

locationRouter.get("/all", async (req,res)=>{
    try{
        const data=await pool.query(`SELECT * FROM locations`)
        res.json(data.rows)
    } catch(error){
        res.status(500).json({
            error:"GET ERROR"
        })
    }
})
locationRouter.post("/new", async(req,res)=>{
    try{
        await pool.query(`INSERT INTO locations(originalName) VALUES ($1)`, [req.body.originalName])
        res.json({
            message:"POST SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            error:"POST ERROR"
        })
    }
})
locationRouter.delete("/delete/all", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM locations`)
        res.json({
            message:"DELETE ALL SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            error:"DELETE ALL ERROR"
        })
    }
})
locationRouter.delete("/delete/:location", async(req,res)=>{
    try{
        await pool.query(`DELETE FROM locations WHERE originalName=$1`, [req.params.location])
        res.json({
            message:"DELETE SUCCESS"
        })
    } catch(error){
        res.status(500).json({
            error:"DELETE ERROR"
        })
    }
})
locationRouter.get("/:location", async (req,res)=>{
    try{
        const data=await pool.query(`SELECT * FROM locations WHERE originalName=$1`,[req.params.location])
        res.json(data.rows)
    } catch(error){
        res.status(500).json({
            error:"GET ERROR"
        })
    }
})

export default locationRouter