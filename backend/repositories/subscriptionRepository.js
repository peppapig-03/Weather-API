import pool from "../sql/pool.js"

const subscriptionRepository=(function(){
    const retrieveSubscriptionsForOneEmail=async function(emailAddress){
        const data=await pool.query(`SELECT E.emailaddress, L.originalname FROM emails as E 
        INNER JOIN subscriptions as S 
        ON E.id=S.email_id 
        INNER JOIN locations as L 
        ON L.id=S.location_id
        WHERE E.emailaddress=$1
        ORDER BY S.location_id ASC`,[emailAddress])
        return data.rows
    }
    const retrieveAllSubscriptions=async function(){
        const data=await pool.query(`SELECT E.emailaddress, L.originalname FROM emails as E 
        LEFT JOIN subscriptions as S 
        ON E.id=S.email_id 
        LEFT JOIN locations as L 
        ON L.id=S.location_id
        ORDER BY S.email_id ASC, S.location_id ASC`)
        return data.rows
    }
    const insertNewSubscription=async function(emailID, locationID){
        await pool.query("INSERT INTO subscriptions(email_id, location_id) VALUES ($1, $2)", [emailID, locationID])
        return
    }
    const deleteAllSubscriptions=async function(){
        await pool.query("DELETE FROM subscriptions")
        return
    }
    const deleteAllSubscriptionsFromEmail=async function(emailID){
        await pool.query("DELETE FROM subscriptions where email_id=$1",[emailID])
        return
    }
    const deleteSubscription=async function(emailID, locationID){
        await pool.query("DELETE FROM subscriptions where email_id=$1 and location_id=$2", [emailID, locationID])
        return
    }
    return {
        retrieveSubscriptionsForOneEmail,
        retrieveAllSubscriptions,
        insertNewSubscription,
        deleteAllSubscriptions,
        deleteAllSubscriptionsFromEmail,
        deleteSubscription
    }
})()
export default subscriptionRepository