import { HealthCheckEntry } from '../types';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const HealthCheck= ({entry} : {entry: HealthCheckEntry}) => {
    return (
        <div>
        <Table >
        <TableHead>
          <TableRow>
            <TableCell>
        {entry.date}  <br/>
        <i>{entry.description}</i> <br/>
        {entry.healthCheckRating} {" "} <br/>
        diagnose by {entry.specialist}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      
        </div>
    );
};

export default HealthCheck;