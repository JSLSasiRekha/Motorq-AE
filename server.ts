import express from "express"
import cors from "cors"
import compression from "compression"
import mongoose from "mongoose"
import { DB_URL } from "./config"
import apiRouter from "@routes"
const app = express()


app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try {
    mongoose.connect(DB_URL)
}
catch(e) {
    console.error(e)
}
app.use("/api", apiRouter)

app.listen(6969, () => console.log("Listening on port: 6969"))