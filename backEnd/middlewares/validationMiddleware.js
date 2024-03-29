const { validationResult, check } = require('express-validator');

// Función para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validaciones para la creación de una nueva cita
const validateCreateCita = [
    // Ejemplo de validación de campo obligatorio
    check('fecha').notEmpty().withMessage('La fecha es obligatoria.'),
    // Ejemplo de validación de formato de fecha
    check('fecha').isDate().withMessage('Formato de fecha inválido.'),
    // Más validaciones aquí según tus requisitos
    // ...
    // Manejar errores de validación
    handleValidationErrors
];

// Validaciones para la actualización de una cita
const validateUpdateCita = [
    // Ejemplo de validación de campo obligatorio
    check('fecha').notEmpty().withMessage('La fecha es obligatoria.'),
    // Ejemplo de validación de formato de fecha
    check('fecha').isDate().withMessage('Formato de fecha inválido.'),
    // Más validaciones aquí según tus requisitos
    // ...
    // Manejar errores de validación
    handleValidationErrors
];

// Validaciones para la creación de un nuevo usuario
const validateCreateUsuario = [
    // Ejemplo de validación de campo obligatorio
    check('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    // Ejemplo de validación de longitud mínima
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    // Más validaciones aquí según tus requisitos
    // ...
    // Manejar errores de validación
    handleValidationErrors
];

// Validaciones para la actualización de un usuario
const validateUpdateUsuario = [
    // Ejemplo de validación de campo obligatorio
    check('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    // Ejemplo de validación de longitud mínima
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    // Más validaciones aquí según tus requisitos
    // ...
    // Manejar errores de validación
    handleValidationErrors
];

module.exports = {
    validateCreateCita,
    validateUpdateCita,
    validateCreateUsuario,
    validateUpdateUsuario
};
