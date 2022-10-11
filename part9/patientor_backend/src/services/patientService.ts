import Patients  from "../../data/patients";
import { v4 as uuidv4 } from 'uuid';

import { NonSensitivePatient, Patient, NewPatient} from '../types';


const getAllNonSensitive = (): Array<NonSensitivePatient> => {
    // 去掉了sensitive的信息
    const patients: Array<NonSensitivePatient> = Patients.map(p => {
        return {
            id: p.id,
            name: p.name,
            dateOfBirth: p.dateOfBirth,
            gender:p.gender,
            occupation: p.occupation
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
            occupation: p.occupation
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
        occupation: newPatient.occupation
    };
};

export default {
    getAll,
    getAllNonSensitive,
    findById,
    addPatient
};