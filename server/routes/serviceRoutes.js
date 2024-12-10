import express from 'express';
import { getServiceData } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/services/:serviceType', getServiceData);

export default router;
