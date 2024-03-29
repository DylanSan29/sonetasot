// Importa el pool de conexiones a la base de datos
const pool = require('../db/pool');

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await pool.query('SELECT * FROM usuarios');
        res.json(usuarios.rows);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios.' });
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUsuario = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (existingUsuario.rows.length > 0) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
        }
    } catch (error) {
        console.error('Error al verificar la existencia del usuario:', error);
        return res.status(500).json({ message: 'Error al verificar la existencia del usuario.' });
    }

    try {
        const newUser = await pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario.' });
    }
};

// Obtener un usuario por su ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (usuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(usuario.rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        res.status(500).json({ message: 'Error al obtener el usuario por ID.' });
    }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const updatedUsuario = await pool.query('UPDATE usuarios SET username = $1, password = $2 WHERE id = $3 RETURNING *', [username, password, id]);
        if (updatedUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(updatedUsuario.rows[0]);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario.' });
    }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUsuario = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        if (deletedUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario.' });
    }
};

module.exports = {
    getAllUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
};
