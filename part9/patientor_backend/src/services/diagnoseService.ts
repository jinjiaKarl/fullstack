import Diagnoses  from "../../data/diagnoses";
import { Diagnose } from '../types';

const getAll = (): Array<Diagnose> => {
    return Diagnoses;
};

export default {
    getAll
};