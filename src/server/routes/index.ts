import * as express from 'express';
import employeeRouter from './employees';

const router = express.Router();

router.use('/api/employee', employeeRouter);

export default router;