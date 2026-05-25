import pool from "../sql/pool.js"

const emailRepository=(function(){
    const insertEmail=async function(emailAddress){
        await pool.query(`INSERT INTO emails(emailAddress) VALUES($1)`, [emailAddress])
        return
    }
    const retrieveEmail=async function(emailAddress){
        const data=await pool.query("SELECT * FROM emails WHERE emailaddress=$1",[emailAddress])
        return data.rows
    }
    const deleteAll=async function(){
        await pool.query(`DELETE FROM emails`)
        return
    }
    const deleteOneEmail=async function(emailAddress){
        await pool.query(`DELETE FROM emails WHERE emailaddress=$1`,[emailAddress])
        return
    }
    return {
        insertEmail,
        retrieveEmail,
        deleteAll,
        deleteOneEmail
    }
})()
export default emailRepository