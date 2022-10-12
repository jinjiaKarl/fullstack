import { HospitalEntry } from '../types';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Hospital= ({entry} : {entry: HospitalEntry}) => {
    return (
        <div>
         <Table >
        <TableHead>
          <TableRow>
            <TableCell>
            {entry.date} <br/>
        <i>{entry.description}</i>  <br/>
        {entry.discharge.date} {entry.discharge.criteria} <br/>
        diagnose by {entry.specialist}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
       
        </div>
    );
};

export default Hospital;