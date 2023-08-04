import { SECRET } from "../config.js";
import { pool } from "../db.js";
import jwt from 'jsonwebtoken'

export const logIn = async (req, res) => {
    const { user, password } = req.body
    console.log(user, password)
    const [rows] = await pool.query('Select id, rol from users where username = ? and password = ?', [user, password])
    if (rows.length === 0) return res.status(404).json({ message: "User not found" })
    const token = jwt.sign({ id: rows.id }, SECRET, { expiresIn: 60 * 10 })
    res.json({ token: token, rol: rows[0].rol })

}