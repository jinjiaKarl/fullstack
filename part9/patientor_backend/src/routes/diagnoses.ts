import express from 'express';
import diagnoseService from '../services/diagnoseService'; 


const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    res.send(diagnoseService.getAll());
});

diagnosesRouter.post('/', (_req, res) => {
    res.send('saving a diagnoses');
});

export default diagnosesRouter;