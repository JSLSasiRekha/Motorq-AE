import { Router } from "express";
import user from "@models/user"
const app = Router()

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).send("Missing required fields")
    }
    console.log(email, password)
    let userDetails = await user.findOne({email, password})
    console.log(userDetails)
    if(!userDetails) {
        return res.status(400).send("Invalid credentials")
    }
    delete userDetails.password
    if(userDetails){
        return res.status(200).send(userDetails)
    }
    else{
        return res.status(400).send("Invalid credentials")
    }
})


export default app