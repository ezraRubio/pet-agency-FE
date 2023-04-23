import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "../../../api";
import UserModal from "./UserModal";

export default function Users({ handleClick }) {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleOpen = (user) => {
    setModal(true);
    setSelectedUser(user);
  };
  const handleClose = () => setModal(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                key={user.id}
                onClick={() => handleOpen(user)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal open={modal} handleClose={handleClose} user={selectedUser} />
    </>
  );
}
