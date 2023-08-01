import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'
import { pool } from '../db.js'

export const verifyToken = async (req, res, next) => {
    try {
        console.log("first")
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({ message: "No se ha recibido ningún token" })

        const decoded = jwt.verify(token, SECRET)

        req.userId = decoded.id

        const user = await pool.query('Select * from users where id = ?', [req.userId])

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

        next()
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}