import { NewPatient, Gender, Entry} from './types';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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

export default toNewPatientEntry;