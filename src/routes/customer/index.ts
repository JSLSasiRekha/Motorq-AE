import { Router } from "express"
import MMY from "@models/mmy"
const app = Router()
app.get("/getMMY", async (_,res) => {
    const enrollments = await MMY.find();
    console.log(enrollments);
    if(!enrollments) {
        return res.status(500).send("Error fetching enrollments")
    }
    return res.status(200).send(enrollments)
});

export default app