import { Router } from "express";
import { createEmpleado, getEmpleados } from "../controllers/empleadosController.js";
import * as middleAuth from '../middlewares/authJWT.js' 

const router = Router()

router.post('/crearEmpleado', createEmpleado)
router.get('/listaEmpleados', getEmpleados)

export default router