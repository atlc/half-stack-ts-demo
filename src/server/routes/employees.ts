import * as express from 'express';
import { IEmployee } from '../../types';
import db from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
    const employees = await db.get_employees();
    res.json(employees);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const employee = await db.get_employee(id);
    res.json(employee);
});

router.post('/', async (req, res) => {
    const newEmployee: IEmployee = req.body;
    const results = await db.create_employee(newEmployee);
    res.json(results);
});

router.put('/:id', async (req, res) => {
    const id: IEmployee['id'] = req.params.id;
    const updatedEmployee: IEmployee = req.body;
    const results = await db.update_employee(id, updatedEmployee);
    res.json(results);
});

router.delete('/:id', async (req, res) => {
    const id: IEmployee['id'] = req.params.id;
    const results = await db.remove_employee(id);
    res.json(results);
});

export default router;