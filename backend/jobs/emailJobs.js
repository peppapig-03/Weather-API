import { quickAddJob } from "graphile-worker"
import dotenv from "dotenv"
dotenv.config()
const queueEmailJob=async function(){
    await quickAddJob({
        connectionString:process.env.DATABASE_URL
    },
    "send_all_emails",
    {})
}

export default queueEmailJob