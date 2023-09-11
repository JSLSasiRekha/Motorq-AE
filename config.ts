import { config as loadEnv } from "dotenv";

loadEnv()

export const DB_URL = process.env.DB_URL || ""