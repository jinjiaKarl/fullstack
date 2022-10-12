import Patients  from "../../data/patients";
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatient, Patient, NewPatient} from '../types';
import { toHealthCheckEntry, toHospitalEntry, toOccupationalHealthcareEntry} from '../utils';


const getAllNonSensitive = (): Array<NonSensitivePatient> => {
    // 去掉了sensitive的信息
    const patients: Array<NonSensitivePatient> = Patients.map(p => {
        return {
            id: p.id,
            name: p.name,
            dateOfBirth: p.dateOfBirth,
            gender:p.gender,
            occupation: p.occupation,
            entries: p.entries
        };
    });
    return patients;
};

const getAll = (): Array<Patient> => {
    return Patients;
};

const findById = (id: string): NonSensitivePatient | undefined => {
    const patients: Array<NonSensitivePatient> = Patients.map(p => {
        return {
            id: p.id,
            name: p.name,
            dateOfBirth: p.dateOfBirth,
            gender:p.gender,
            occupation: p.occupation,
            entries: p.entries
        };
    });
    const entry = patients.find(p => p.id === id);
    return entry;
};

const addPatient = (entry: NewPatient): NonSensitivePatient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuidv4() ;
    const newPatient: Patient = {
        id: id,
        ...entry
    };
    Patients.push(newPatient);
    return {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender:newPatient.gender,
        occupation: newPatient.occupation,
        entries: newPatient.entries
    };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEntry = (id: string, entry: any): Patient | undefined => {
    const patient = Patients.find(p => p.id === id);
    if (patient) {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const id = uuidv4() ;
        switch (entry.type as string) {
            case "HealthCheck":
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                patient.entries.push(toHealthCheckEntry({id,
                    description: entry.description,
                    date: entry.date,
                    specialist: entry.specialist,
                    diagnosisCodes: entry.diagnosisCodes,
                    healthCheckRating: entry.healthCheckRating}));
                break;
            case "Hospital":
                 // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                 patient.entries.push(toHospitalEntry({id,
                    description: entry.description,
                    date: entry.date,
                    specialist: entry.specialist,
                    diagnosisCodes: entry.diagnosisCodes,
                    discharge: entry.discharge})); 
                break;
            case "OccupationalHealthcare":
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  patient.entries.push(toOccupationalHealthcareEntry({id,
                    description: entry.description,
                    date: entry.date,
                    specialist: entry.specialist,
                    diagnosisCodes: entry.diagnosisCodes,
                    employerName: entry.employerName,
                    sickLeave: entry.sickLeave
                })); 
                break;
            default:
                break;
        }
        return patient;
    }
    return undefined;
};

export default {
    getAll,
    getAllNonSensitive,
    findById,
    addPatient,
    addEntry
};