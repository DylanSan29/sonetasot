const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Rutas para las citas
router.get('/', citasController.getAllCitas);
router.post('/', citasController.createCita);
router.get('/:id', citasController.getCitaById);
router.put('/:id', citasController.updateCita);
router.delete('/:id', citasController.deleteCita);
router.get('/verify/:curp', async (req, res) => {
    const { curp } = req.params;
    try {
        const resultado = await citasController.verifyCita(curp);
        res.json({ message: resultado });
    } catch (error) {
        console.error('Error al verificar la cita:', error);
        res.status(500).json({ message: 'Error al verificar la cita.' });
    }
});
router.get('/getAll/:curp', async (req, res) => {
    const { curp } = req.params;
    try {
        const citas = await citasController.getCitasByCurp(curp);
        res.json({ citas });
    } catch (error) {
        console.error('Error al obtener las citas por CURP:', error);
        res.status(500).json({ message: 'Error al obtener las citas por CURP.' });
    }
});

module.exports = router;
