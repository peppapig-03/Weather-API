import {run} from "graphile-worker"
import allEmailFlow from "../serviceFlows/allEmailFlow.js"
import dotenv from "dotenv"
dotenv.config()

run({
    connectionString: process.env.DATABASE_URL,

    taskList:{
        send_all_emails: async()=>{
            await allEmailFlow(process.env.CRON_JOB_KEY)
        }
    }
})