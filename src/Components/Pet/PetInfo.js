import { CardContent, Typography } from "@mui/material";

export default function PetInfo({ classes, pet }) {
  return (
    <CardContent className={classes.scroll}>
      <Typography className={classes.title} variant="h5" component="h2">
        Type: {pet.type}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Height: {pet.height}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Weight:{pet.weight}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Color:{pet.color}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Breed: {pet.breed}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Hypoallergenic: {pet.hypoallergenic ? "yes" : "no"}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Dietary restrictions: {pet.diet}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        Biography: {pet.bio}
      </Typography>
    </CardContent>
  );
}
