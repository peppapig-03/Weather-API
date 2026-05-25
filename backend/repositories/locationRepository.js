import { ReadableStreamDefaultController } from "stream/web"
import pool from "../sql/pool.js"

const locationRepository=(function(){
    const retrieveLocation=async function(locationName){
        const data=await pool.query("SELECT * FROM locations where originalname=$1", [locationName])
        return data.rows
    }
    const retrieveAllLocations=async function(){
        const data=await pool.query("SELECT originalname FROM locations ORDER BY id ASC")
        return data.rows
    }
    const insertLocation=async function(locationName){
        await pool.query("INSERT INTO locations(originalName) VALUES ($1)", [locationName])
        return
    }
    const deleteAllLocations=async function(){
        await pool.query("DELETE FROM LOCATIONS")
        return
    }
    const deleteLocation=async function(locationName){
        await pool.query("DELETE FROM locations WHERE originalname=$1", [locationName])
        return
    }
    return {
        retrieveLocation,
        retrieveAllLocations,
        insertLocation,
        deleteAllLocations,
        deleteLocation
    }
})()

export default locationRepository