import { Modal } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/userContext";
import Form from "../AddPet/Form";
import PetsTable from "./PetsTable";
import useStyles from "./styles.js";

export default function Pets() {
  const classes = useStyles();
  const { pets, selectedPet, setSelectedPet, setRefresh } =
    useContext(UserContext);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setRefresh((prev) => !prev);
  }, [setRefresh]);

  const handleOpen = (pet) => {
    setModal(true);
    setSelectedPet(pet);
  };
  const handleClose = () => setModal(false);

  return (
    <>
      <PetsTable handleOpen={handleOpen} pets={pets} />
      <Modal
        open={modal}
        onClose={handleClose}
        className={classes.scroll}
        sx={{margin: "3rem"}}
      >
        <div>
          <Form petToEdit={selectedPet} handleClose={handleClose} />
        </div>
      </Modal>
    </>
  );
}
