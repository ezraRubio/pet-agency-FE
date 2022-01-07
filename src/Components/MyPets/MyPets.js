import { Grid, Typography } from "@mui/material";
import PetCard from "../PetCard/PetCard";
import useStyles from "./styles.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";

export default function MyPets() {
  const classes = useStyles();
  const { savedPets, adoptedPets } = useContext(UserContext);
  const [saved, setSaved] = useState([]);
  const [adopted, setAdopted] = useState([]);

  useEffect(() => savedPets && setSaved(savedPets), [savedPets]);
  useEffect(() => adoptedPets && setAdopted(adoptedPets), [adoptedPets]);

  return (
    <div>
      <Grid container className={classes.title}>
        <Typography variant="h6">
          {savedPets[0] ? "Saved Pets" : "No saved pets"}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.pets}>
        {saved && saved.map((pet) => <PetCard pet={pet} key={pet.name} />)}
      </Grid>
      <Grid container className={classes.title}>
        <Typography variant="h6">
          {adoptedPets[0] ? "Adopted Pets" : "No adopted pets"}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.pets}>
        {adopted && adopted.map((pet) => <PetCard pet={pet} key={pet.name} />)}
      </Grid>
    </div>
  );
}
