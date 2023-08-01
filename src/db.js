import { config } from 'dotenv'
import {createPool} from 'mysql2/promise'

config()
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ajstyles02',
    port: 3306,
    database: 'file_system'
})