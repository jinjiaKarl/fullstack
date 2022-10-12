import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
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
      </div>
    );
};

export default PatientPage;