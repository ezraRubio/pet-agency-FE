import { useContext, useEffect, useState } from "react";
import useStyles from "./styles.js";
import {
  TextField,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addPet, editPet } from "../../../api/index.js";
import Type from "./Type.js";
import { UserContext } from "../../Context/userContext.js";

export default function Form({ petToEdit, handleClose }) {
  const classes = useStyles();
  const petInitState = {
    type: "",
    name: "",
    status: "",
    height: 0,
    weight: 0,
    color: "",
    bio: "",
    hypoallergenic: false,
    diet: [],
    breed: "",
  };
  const [newPet, setNewPet] = useState(petInitState);
  const [ file, setFile ] = useState({})
  const { setRefresh, isLoading, setIsLoading } = useContext(UserContext);

  const statuses = ["Available", "Fostered", "Adopted"];
  const diets = ["for puppy", "kidney problems", "old pet"];

  useEffect(() => petToEdit && setNewPet(petToEdit), [petToEdit]);

  const handleCheckbox = () => {
    setNewPet((prevState) => ({
      ...newPet,
      hypoallergenic: !prevState.hypoallergenic,
    }));
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    file.type === "image/jpeg" ? setFile(file) : alert("only image file");
  };

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData();
    for (const key in newPet) {
      formData.append(key, newPet[key])
    }
    file && formData.append("image", file)
    petToEdit
      ? editPet(petToEdit._id, formData)
          .then((res) => res && alert("edited: " + res.data.name))
          .catch((err) => alert(err))
          .finally(()=>{
            setRefresh((prev) => !prev);
            setIsLoading(false)
            handleClose();
          })
      : addPet(formData)
          .then((res) => res && alert("added: " + res.data.name))
          .catch((err) => alert(err))
          .finally(()=>{
            setIsLoading(false)
            clearForm()
          })
  };

  const clearForm = () => {
    setNewPet(petInitState);
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {petToEdit ? "Edit Pet" : "Add a Pet"}
        </Typography>
        <Type pet={newPet} setPet={setNewPet} />
        <TextField
          name="breed"
          variant="outlined"
          label="Breed"
          fullWidth
          sx={{ mt: 2 }}
          value={newPet.breed}
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
        />
        <TextField
          required
          name="name"
          variant="outlined"
          label="Name"
          fullWidth
          sx={{ mt: 2 }}
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Adoption Status</InputLabel>
          <Select
            name="status"
            required
            variant="outlined"
            label="Adoption Status"
            value={newPet.status}
            onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="height"
          variant="outlined"
          label="Height"
          type="number"
          fullWidth
          sx={{ mt: 2 }}
          value={newPet.height}
          onChange={(e) => setNewPet({ ...newPet, height: e.target.value })}
        />
        <TextField
          name="weight"
          variant="outlined"
          label="Weight"
          type="number"
          fullWidth
          sx={{ mt: 2 }}
          value={newPet.weight}
          onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
        />
        <TextField
          name="color"
          variant="outlined"
          label="Color"
          fullWidth
          sx={{ mt: 2 }}
          value={newPet.color}
          onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
        />
        {petToEdit ? null : //this is just because for some reason, all of the sudden, this selected breaks if i'm editing a pet
          <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Diet</InputLabel>
          <Select
            name="diet"
            variant="outlined"
            label="Diet"
            multiple
            value={newPet?.diet}
            onChange={(e) => setNewPet({ ...newPet, diet: e.target.value })}
          >
            {diets?.map((diet) => (
              <MenuItem key={diet} value={diet}>
                {diet}
              </MenuItem>
            ))}
          </Select>
        </FormControl>}
        <TextField
          name="bio"
          variant="outlined"
          label="Biography"
          multiline
          fullWidth
          sx={{ mt: 2 }}
          value={newPet.bio}
          onChange={(e) => setNewPet({ ...newPet, bio: e.target.value })}
        />
        <TextField
          type="file"
          fullWidth
          sx={{ mt: 2 }}
          onChange={handleSelectFile}
        />
        <FormControlLabel
          sx={{ mt: 2 }}
          control={
            <Checkbox
              onChange={handleCheckbox}
              checked={newPet.hypoallergenic ? true : false}
            />
          }
          label="Hypoallergenic"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          {petToEdit ? "Edit Pet" : "Add a Pet"}
        </LoadingButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          fullWidth
          sx={{ mt: 2 }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
