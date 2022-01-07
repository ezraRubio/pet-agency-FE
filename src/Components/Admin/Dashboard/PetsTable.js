import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function PetsTable({ pets, handleOpen }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            {handleOpen && <TableCell align="right">Status</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {pets &&
            pets.map((pet) => (
              <TableRow
                hover
                key={pet._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleOpen && handleOpen(pet)}
              >
                <TableCell component="th" scope="row">
                  {pet.name}
                </TableCell>
                <TableCell align="right">{pet.type}</TableCell>
                {handleOpen && (
                  <TableCell align="right">{pet.status}</TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
