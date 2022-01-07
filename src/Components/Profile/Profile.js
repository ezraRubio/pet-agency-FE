import { Paper, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useContext, useEffect, useState } from "react";
import { editUser, getUserById } from "../../api/index.js";
import { UserContext } from "../Context/userContext.js";
import useStyles from "./styles.js";

export default function Profile() {
  const { uid, setUid, isLoading, setIsLoading } = useContext(UserContext);
  const classes = useStyles();
  const userInitState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
  };
  const [userData, setUserData] = useState(userInitState);

  useEffect(() => {
    uid &&
      getUserById(uid)
        .then((res) => setUserData(res.data))
        .catch((e) => console.log(e.message));
  }, [uid]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();

    editUser(uid, userData)
    .then((res) => {
      setUid(res.data._id);
      alert(`updated successfully, ${userData.firstName ? userData.firstName : userData.email}`);
    })
    .catch((e) => alert(e.message))
    .finally(()=>{
        e.target.reset();
        setIsLoading(false)
      })
    };

  return (
    <Paper>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Edit your info</Typography>
        <TextField
          name="firstName"
          variant="outlined"
          label="First name"
          fullWidth
          sx={{ mt: 2 }}
          value={userData.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          variant="outlined"
          label="Last name"
          fullWidth
          sx={{ mt: 2 }}
          value={userData.lastName}
          onChange={handleChange}
        />
        <TextField
          name="email"
          variant="outlined"
          label="Email"
          type="email"
          fullWidth
          sx={{ mt: 2 }}
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          name="phone"
          variant="outlined"
          label="Phone number"
          type="number"
          fullWidth
          sx={{ mt: 2 }}
          value={userData.phone}
          onChange={handleChange}
        />

        <TextField
          name="bio"
          variant="outlined"
          label="Biography"
          multiline
          fullWidth
          sx={{ mt: 2 }}
          value={userData.bio}
          onChange={handleChange}
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
          Update profile
        </LoadingButton>
      </form>
    </Paper>
  );
}
