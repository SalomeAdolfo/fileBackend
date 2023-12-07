import { config } from "dotenv"

config()

export const SECRET =  process.env.SECRETWORD
export const BD_HOST = process.env.BD_HOST 
export const BD_USER = process.env.BD_USER 
export const BD_PASSWORD = process.env.BD_PASSWORD 
export const BD_PORT = process.env.BD_PORT 
export const BD_DATABASE = process.env.BD_DATABASE 