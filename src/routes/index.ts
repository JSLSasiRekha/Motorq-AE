import { Router } from "express"

import adminRouter from "./admin"
import authRouter from "./auth"
import customerRouter from "./customer"

const app = Router()


app.use("/admin", adminRouter)
app.use("/auth", authRouter)
app.use("/customer", customerRouter)

export default app