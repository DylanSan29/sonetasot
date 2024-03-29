const pool = require('../db/pool');
 // Importa la configuración de conexión a PostgreSQL

// Función para obtener todas las citas
const getCitas = async () => {
    try {
        const citas = await pool.query('SELECT * FROM citas');
        return citas.rows;
    } catch (error) {
        console.error('Error al obtener las citas:', error);
        throw error;
    }
};

// Función para obtener una cita por su ID
const getCitaById = async (id) => {
    try {
        const cita = await pool.query('SELECT * FROM citas WHERE id = $1', [id]);
        return cita.rows[0];
    } catch (error) {
        console.error('Error al obtener la cita por ID:', error);
        throw error;
    }
};

// Función para crear una nueva cita
const createCita = async (fecha, CURP, nombre) => {
    try {
        const nuevaCita = await pool.query('INSERT INTO citas (fecha, curp, nombre) VALUES ($1, $2, $3) RETURNING *', [fecha, CURP, nombre]);
        return nuevaCita.rows[0];
    } catch (error) {
        console.error('Error al crear una nueva cita:', error);
        throw error;
    }
};

// Función para actualizar una cita existente
const updateCita = async (id, fecha, CURP, nombre) => {
    try {
        const citaActualizada = await pool.query('UPDATE citas SET fecha = $1, curp = $2, nombre = $3 WHERE id = $4 RETURNING *', [fecha, CURP, nombre, id]);
        return citaActualizada.rows[0];
    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        throw error;
    }
};

// Función para eliminar una cita por su ID
const deleteCita = async (id) => {
    try {
        await pool.query('DELETE FROM citas WHERE id = $1', [id]);
        return { message: 'Cita eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la cita por ID:', error);
        throw error;
    }
};

module.exports = {
    getCitas,
    getCitaById,
    createCita,
    updateCita,
    deleteCita
};
