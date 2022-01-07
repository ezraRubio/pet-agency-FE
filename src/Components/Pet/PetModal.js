import useStyles from "./styles.js";
import { Card, CardMedia, Modal, Typography } from "@mui/material";
import PetInfo from "./PetInfo.js";
import PetActions from "./PetActions.js";
import { useContext } from "react";
import { UserContext } from "../Context/userContext.js";

export default function PetModal({ handleClose, open, pet }) {
  const classes = useStyles();
  const {isAuth} = useContext(UserContext);

  return (
    <Modal open={open} onClose={handleClose}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            pet.picture
              ? pet.picture
              : "https://images.dog.ceo/breeds/setter-gordon/n02101006_776.jpg"
          }
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{pet.name}</Typography>
          <Typography variant="body2">{pet.status}</Typography>
        </div>
        <PetInfo classes={classes} pet={pet} />
        {isAuth ? <PetActions classes={classes} pet={pet} /> : <h4 style={{alignSelf:"center"}}>Log in or Sign up to see more options</h4>}
      </Card>
    </Modal>
  );
}
