// Importa el pool de conexiones a la base de datos
const pool = require('../db/pool');

// Obtener todas las citas
const getAllCitas = async (req, res) => {
    try {
        const citas = await pool.query('SELECT * FROM citas');
        res.json(citas.rows);
    } catch (error) {
        console.error('Error al obtener todas las citas:', error);
        res.status(500).json({ message: 'Error al obtener las citas.' });
    }
};

// Crear una nueva cita
const createCita = async ({ fecha, curp, nombre }) => {
    // Crear la nueva cita
    try {
        const newCita = await pool.query('INSERT INTO citas (fecha, curp, nombre) VALUES ($1, $2, $3) RETURNING *', [fecha, curp, nombre]);
        return newCita.rows[0]; // Devuelve la nueva cita creada
    } catch (error) {
        console.error('Error al crear la cita:', error);
        throw error; // Re-lanzamos el error para manejarlo en la función caller
    }
};

// Obtener una cita por su ID
const getCitaById = async (req, res) => {
    const { id } = req.params;

    try {
        const cita = await pool.query('SELECT * FROM citas WHERE id = $1', [id]);
        if (cita.rows.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada.' });
        }
        res.json(cita.rows[0]);
    } catch (error) {
        console.error('Error al obtener la cita por ID:', error);
        res.status(500).json({ message: 'Error al obtener la cita por ID.' });
    }
};

// Actualizar una cita
const updateCita = async (req, res) => {
    const { id } = req.params;
    const { fecha, CURP, nombre } = req.body;

    try {
        const updatedCita = await pool.query('UPDATE citas SET fecha = $1, CURP = $2, nombre = $3 WHERE id = $4 RETURNING *', [fecha, CURP, nombre, id]);
        if (updatedCita.rows.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada.' });
        }
        res.json(updatedCita.rows[0]);
    } catch (error) {
        console.error('Error al actualizar la cita:', error);
        res.status(500).json({ message: 'Error al actualizar la cita.' });
    }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCita = await pool.query('DELETE FROM citas WHERE id = $1 RETURNING *', [id]);
        if (deletedCita.rows.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada.' });
        }
        res.json({ message: 'Cita eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        res.status(500).json({ message: 'Error al eliminar la cita.' });
    }
};

const verifyCita = async (curp) => {
    try {
        const citaExistente = await pool.query('SELECT * FROM citas WHERE curp = $1', [curp]);
        if (citaExistente.rows.length > 0) {
            return 'Ya hay un registro con el CURP proporcionado.';
        } else {
            // Generar un nombre aleatorio
            const nombreAleatorio = generarNombreAleatorio();
            // Obtener la fecha actual
            const fechaActual = obtenerFechaActual();
            // Crear la nueva cita
            try {
                await createCita({ fecha: fechaActual, curp, nombre: nombreAleatorio });
                return 'Sin registro para el CURP proporcionado.';
            } catch (error) {
                console.error('Error al crear la cita:', error);
                return 'Error al crear la cita.';
            }
        }
    } catch (error) {
        console.error('Error al verificar la cita:', error);
        return 'Error al verificar la cita.'; // En caso de error, se considera que la cita no existe
    }
};

const generarNombreAleatorio = () => {
    const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Sofía'];
    return nombres[Math.floor(Math.random() * nombres.length)];
};

const obtenerFechaActual = () => {
    // Obtiene la fecha actual en el formato deseado (por ejemplo, YYYY-MM-DD)
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getCitasByCurp = async (curp) => {
    try {
        const citas = await pool.query('SELECT * FROM citas WHERE curp = $1', [curp]);
        return citas.rows; // Devuelve todas las citas encontradas para el CURP especificado
    } catch (error) {
        console.error('Error al obtener las citas por CURP:', error);
        throw error; // Re-lanzamos el error para manejarlo en la función caller
    }
};

module.exports = {
    getAllCitas,
    createCita,
    getCitaById,
    updateCita,
    deleteCita,
    verifyCita,
    getCitasByCurp
};
