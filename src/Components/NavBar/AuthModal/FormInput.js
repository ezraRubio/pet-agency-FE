import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


const FormInput = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <Grid item xs={12} sm={12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default FormInput;
