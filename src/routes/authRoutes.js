import { Router } from 'express'
import { logIn } from '../controllers/authController.js'

const router = Router()

router.post('/logIn', logIn)

export default router;