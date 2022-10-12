import express from 'express';
import patientService from '../services/patientService'; 
import toNewPatientEntry from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientService.getAllNonSensitive());
});

patientsRouter.post('/', (req, res) => { 
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = patientService.addPatient(toNewPatientEntry(req.body));
        res.json(newEntry);
    } catch (error: unknown) {
        console.log(error);
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

patientsRouter.get('/:id', (req, res) => {
   const entry = patientService.findById(req.params.id);
   if (entry) {
    res.send(entry);
   } else {
    res.sendStatus(404);
   }
});

patientsRouter.post('/:id/entries', (req, res) => {
    const entry = patientService.addEntry(req.params.id, req.body);
    if (entry) {
        res.send(entry);
    } else {
        res.sendStatus(404);
    }
});

export default patientsRouter;
  