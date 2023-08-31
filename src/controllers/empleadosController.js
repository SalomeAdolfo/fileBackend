import { pool } from "../db.js";

export const createEmpleado = async (req, res) => {
    try {
        const {
            fecha_registro,
            estatus,
            fecha_baja,
            motivo_baja,
            empresa,
            localidad,
            curp,
            apellido_paterno,
            apellido_materno,
            nombres,
            fecha_ingreso,
            nss,
            rfc,
            fecha_nacimiento,
            lugar_nacimiento,
            direccion,
            codigo_postal,
            municipio,
            estado_civil,
            banco,
            numero_cuenta,
            clave_interbancaria,
            correo_electronico,
            telefono_colaborador,
            beneficiario_emergencia,
            parentesco,
            numero_beneficiario,
            infonavit,
            fecha_pago_cumpleanos,
            vacaciones_anterior,
            vacaciones_actual,
            vacaciones_tomadas,
            vacaciones_pendientes,
            vacaciones_por_pagar,
            periodo_contrato,
            pago_cumpleanos,
            mes_nacimiento,
            renovar_contrato,
            fecha_termino_contrato,
            actas_administrativas,
            datos_adjuntos
        } = req.body;

        const query = `
            INSERT INTO empleados (
                fecha_registro,
                estatus,
                fecha_baja,
                motivo_baja,
                empresa,
                localidad,
                curp,
                apellido_paterno,
                apellido_materno,
                nombres,
                fecha_ingreso,
                nss,
                rfc,
                fecha_nacimiento,
                lugar_nacimiento,
                direccion,
                codigo_postal,
                municipio,
                estado_civil,
                banco,
                numero_cuenta,
                clave_interbancaria,
                correo_electronico,
                telefono_colaborador,
                beneficiario_emergencia,
                parentesco,
                numero_beneficiario,
                infonavit,
                fecha_pago_cumpleanos,
                vacaciones_anterior,
                vacaciones_actual,
                vacaciones_tomadas,
                vacaciones_pendientes,
                vacaciones_por_pagar,
                periodo_contrato,
                pago_cumpleanos,
                mes_nacimiento,
                renovar_contrato,
                fecha_termino_contrato,
                actas_administrativas,
                datos_adjuntos
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            fecha_registro,
            estatus,
            fecha_baja,
            motivo_baja,
            empresa,
            localidad,
            curp,
            apellido_paterno,
            apellido_materno,
            nombres,
            fecha_ingreso,
            nss,
            rfc,
            fecha_nacimiento,
            lugar_nacimiento,
            direccion,
            codigo_postal,
            municipio,
            estado_civil,
            banco,
            numero_cuenta,
            clave_interbancaria,
            correo_electronico,
            telefono_colaborador,
            beneficiario_emergencia,
            parentesco,
            numero_beneficiario,
            infonavit,
            fecha_pago_cumpleanos,
            vacaciones_anterior,
            vacaciones_actual,
            vacaciones_tomadas,
            vacaciones_pendientes,
            vacaciones_por_pagar,
            periodo_contrato,
            pago_cumpleanos,
            mes_nacimiento,
            renovar_contrato,
            fecha_termino_contrato,
            actas_administrativas,
            datos_adjuntos
        ];

        const [result] = await pool.query(query, values);

        res.status(201).json({ id: result.insertId, message: 'Empleado creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el empleado, por favor, inténtalo de nuevo más tarde' });
    }
};


export const getEmpleados = async (req, res) => {
    const [rows] = await pool.query('select*from empleados');
    res.json(rows)
}