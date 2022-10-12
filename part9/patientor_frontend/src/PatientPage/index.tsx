import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Entry } from '../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return  <HealthCheck entry={entry}/>;
        case "Hospital":
            return <Hospital entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry}/>;
        default:
            return assertNever(entry);
    }
};
const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    if (id === undefined) {
        return null;
    }
    const [{ patients }] = useStateValue();
    const patient = patients[id];
    if (patient === undefined) {
        return null;
    }
    
    return (
        <div>
        <h2>
          {patient.name} {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : patient.gender} {' '}
        </h2>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3> entries </h3>
        {patient.entries.map(entry => (
            <div key={entry.id}>
                <EntryDetails entry={entry} />
            </div>
        ))}
      </div>
    );
};

export default PatientPage;