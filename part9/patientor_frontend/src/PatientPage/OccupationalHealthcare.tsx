import { OccupationalHealthcareEntry } from '../types';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const OccipationalHealthcare= ({entry} : {entry: OccupationalHealthcareEntry}) => {
    return (
        <div>
            <Table >
        <TableHead>
          <TableRow>
            <TableCell>
            {entry.date}  {entry.employerName} <br/>
            <i>{entry.description}</i> <br/>
        diagnose by {entry.specialist}</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      
        </div>
    );
};

export default OccipationalHealthcare;