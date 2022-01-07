import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import useStyles from "./styles.js";
import PetModal from "../Pet/PetModal";
import { useState, useContext } from "react";
import { UserContext } from "../Context/userContext.js";

export default function PetCard({ pet }) {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const {selectedPet, setSelectedPet} = useContext(UserContext);

  const handleOpen = () => {
    setModal(true)
    setSelectedPet(pet)
  }
  const handleClose = () => setModal(false);

  return (
    <>
      <Card className={classes.card} sx={{ maxWidth: 345, margin: "2rem" }}>
        <CardMedia
          component="img"
          height="140"
          image={
            pet.picture
              ? pet.picture
              : "https://images.dog.ceo/breeds/setter-gordon/n02101006_776.jpg"
          }
          alt={pet.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pet.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>Learn More</Button>
        </CardActions>
      </Card>
      <PetModal open={modal} handleClose={handleClose} pet={selectedPet} />
    </>
  );
}
