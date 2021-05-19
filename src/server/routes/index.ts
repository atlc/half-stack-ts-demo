import * as express from 'express';
import employeeRouter from './employees';

const router = express.Router();

router.use('/api/employees', employeeRouter);

export default router;