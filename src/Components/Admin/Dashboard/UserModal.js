import { Modal, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getPetsByUser } from "../../../api/index.js";
import PetsTable from "./PetsTable.js";
import useStyles from "./styles.js";
import clsx from 'clsx';

export default function UserModal({ open, handleClose, user }) {
  const classes = useStyles();
  const [adopted, setAdopted] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    getPetsByUser(user._id)
      .then((res) => {
        res && res.data.saved && setSaved(res.data.saved);
        res.data.adopted && setAdopted(res.data.adopted);
      })
      .catch((e) => console.log(e.message));
  }, [user._id]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Card className={clsx(classes.card, classes.scroll)} sx={{overflowY:"scroll"}}>
        <Typography sx={{ margin: "1rem" }} variant="h5">
          Name:{" "}
          {
            <Typography component="span">
              {user.firstName} {user.lastName}
            </Typography>
          }
        </Typography>
        <Typography sx={{ margin: "1rem" }} variant="h5">
          Email: {<Typography component="span">{user.email}</Typography>}
        </Typography>
        <Typography sx={{ margin: "1rem" }} variant="h5">
          Phone: {<Typography component="span">{user.phone}</Typography>}
        </Typography>
        {saved[0] ? (
          <Typography sx={{ margin: "1rem" }} variant="h5">
            Saved: <PetsTable pets={saved} />
          </Typography>
        ) : (
          <Typography sx={{ margin: "1rem" }} variant="h5">
            no saved pets
          </Typography>
        )}
        {adopted[0] ? (
          <Typography sx={{ margin: "1rem" }} variant="h5">
            Adopted: <PetsTable pets={adopted} />{" "}
          </Typography>
        ) : (
          <Typography sx={{ margin: "1rem" }} variant="h5">
            no adopted pets
          </Typography>
        )}
      </Card>
    </Modal>
  );
}
