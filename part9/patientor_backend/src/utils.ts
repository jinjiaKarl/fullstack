import { NewPatient, Gender, Entry,HealthCheckEntry, Diagnose, HealthCheckRating, OccupationalHealthcareEntry,HospitalEntry} from './types';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// 判断类型

// type guard + type predicate
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing comment');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (str: any): str is Gender => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(str);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries)) {
        throw new Error('Incorrect or missing entries');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };
// parse data from outside sources
const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation, entries}: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };
    return newEntry;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCheckRating = (str: any): str is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(str);
};

const parseCheckRating = (checkRating: unknown): HealthCheckRating => {
  if (checkRating === undefined || !isCheckRating(checkRating)) {
      throw new Error('Incorrect or missing CheckRating: ' + checkRating);
  }
  return checkRating;
};


type FieldsHealthCheckEntry = { id: string,  description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, healthCheckRating: unknown };

export const toHealthCheckEntry = ({id, description, date, specialist, diagnosisCodes, healthCheckRating}: FieldsHealthCheckEntry): HealthCheckEntry => {
    const newEntry: HealthCheckEntry = {
        id: id,
        type: "HealthCheck",
        description: parseName(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        diagnosisCodes: diagnosisCodes as Array<Diagnose['code']>,
        healthCheckRating: parseCheckRating(healthCheckRating)
    };
    return newEntry;
};

const parseSickLeave = (sickLeave: unknown): {startDate: string, endDate: string} => {
    if (!sickLeave || typeof sickLeave !== 'object' || 'startDate' in sickLeave === false || 'endDate' in sickLeave === false) {
        throw new Error('Incorrect or missing sickLeave');
    }

    return sickLeave as {startDate: string, endDate: string};
};

type FieldsOccupationalHealthcareEntry = { id: string,  description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, employerName: unknown ,sickLeave: unknown };

export const toOccupationalHealthcareEntry = ({id, description, date, specialist, diagnosisCodes, employerName, sickLeave}: FieldsOccupationalHealthcareEntry): OccupationalHealthcareEntry => {
    const newEntry: OccupationalHealthcareEntry = {
        id: id,
        type: "OccupationalHealthcare",
        description: parseName(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        diagnosisCodes: diagnosisCodes as Array<Diagnose['code']>,
        employerName: parseName(employerName),
        sickLeave: parseSickLeave(sickLeave)
    };
    return newEntry;
};


const parseDischarge = (discharge: unknown): {date: string, criteria: string} => {
    // 如果传入的是{date: "2020-01-01", criteriaaaa: "criteria"}，
    // 则返回{date: "2020-01-01", criteriaaa: "criteria"}。这里的as为啥不报错？
    const ret = discharge as {date: string, criteria: string};
    if (!ret || ret.date === undefined || ret.criteria === undefined) {
        throw new Error('Incorrect or missing discharge');
    }
    return ret; 
};

type FieldsHospitalEntry = { id: string,  description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, discharge: unknown};

export const toHospitalEntry = ({id, description, date, specialist, diagnosisCodes, discharge}: FieldsHospitalEntry): HospitalEntry => {
    const newEntry: HospitalEntry = {
        id: id,
        type: "Hospital",
        description: parseName(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        diagnosisCodes: diagnosisCodes as Array<Diagnose['code']>,
        discharge: parseDischarge(discharge)
    };
    return newEntry;
};


export default toNewPatientEntry;