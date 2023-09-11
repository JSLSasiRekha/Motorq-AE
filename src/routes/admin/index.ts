import { Router } from "express"
import MMY from "@models/mmy"
import Enrollment from "@models/enrollment"
import { validateAdminVin } from "@utils/validation"
import { EnrollmentStatus } from "@_types/enrollment"

const app = Router()

app.post("/addVehicleInfo", async (req, res) => {
    const { make, model, year, vin, user } = req.body
    if(!make || !model || !year || !vin) {
        return res.status(400).send("Missing required fields")
    }
    if(!validateAdminVin(vin)) {
        return res.status(400).send("Invalid Admin VIN")
    }
    const newMMY = await MMY.create({ make, model, year, adminVin: vin, user })
    if(!newMMY) {
        return res.status(500).send("Error creating MMY")
    }
    return res.status(200).send(newMMY)
})

app.post("/approveVehicle", async (req, res) => {
    console.log(req.body);
    const { enrollmentId } = req.body
    console.log(enrollmentId);
    if(!enrollmentId) {
        return res.status(400).send("Missing required fields")
    }
   await Enrollment.findOneAndUpdate(
        { _id: enrollmentId }, // Query condition
        { status: EnrollmentStatus.approved }, // Update fields
        { new: true } // Return the updated document
    );
    return res.status(200).send("Vehicle approved")
})

app.post("/rejectVehicle", async (req, res) => {
    const { enrollmentId } = req.body
    if(!enrollmentId) {
        return res.status(400).send("Missing required fields")
    }
    await  Enrollment.findOneAndUpdate( { _id: enrollmentId },{ status: EnrollmentStatus.rejected },{ new: true })
    return res.status(200).send("Vehicle rejected")
})
app.get("/getEnrollments", async (_,res) => {
    const enrollments = await Enrollment.find()
    if(!enrollments) {
        return res.status(500).send("Error fetching enrollments")
    }
    return res.status(200).send(enrollments)
})


app.get("/getVehicles", async (_, res) => {
    const enrollments = await Enrollment.find()
    if(!enrollments) {
        return res.status(500).send("Error fetching enrollments")
    }
    const status = {
        pending: [] as any[],
        approved: [] as any[],
        rejected: [] as any[],
        stats: {
            pending: 0,
            approved: 0,
            rejected: 0
        }
    }
    enrollments.forEach(enrollment => {
        if(enrollment.status === EnrollmentStatus.pending) {
            status.pending.push(enrollment)
            status.stats.pending++
        }
        else if(enrollment.status === EnrollmentStatus.approved) {
            status.approved.push(enrollment)
            status.stats.approved++
        }
        else if(enrollment.status === EnrollmentStatus.rejected) {
            status.rejected.push(enrollment)
            status.stats.rejected++
        }
    })
    return res.status(200).send(status)
}) 

export default app