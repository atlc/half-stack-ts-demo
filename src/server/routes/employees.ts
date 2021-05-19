import * as express from 'express';
import database from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allEmployees = await database.get_all_employees();
        res.json(allEmployees);
    } catch (error) {
        res.status(500).json({ message: "An error occurred!", error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await database.get_single_employee(id);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "An error occurred!", error });
    }
});

router.post('/', async (req, res) => {
    try {
        const newEmployee = req.body;
        const results = await database.create_employee(newEmployee);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "An error occurred!", error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEmployee = req.body;
        const results = await database.update_employee(id, updatedEmployee);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "An error occurred!", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await database.remove_employee(id);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "An error occurred!", error });
    }
});

export default router;