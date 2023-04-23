import {
  Modal,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LogIn from "./LogIn";
import useStyles from "./styles";
import SignUp from "./SignUp";
import { useContext, useState } from "react";
import { logIn, signUp } from "../../../api";
import { UserContext } from "../../Context/userContext";

export default function AuthModal({ handleClose, open }) {
  const { setUid, setRole, isLoading, setIsLoading, setIsAuth } = useContext(UserContext);
  const [isLogIn, setIsLogIn] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [checkPasswords, setCheckPasswords] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles();

  const switchMode = () => {
    setIsLogIn((prevState) => !prevState);
  };

  const handleChange = (e) => {
    e.target.name === "confirmPassword"
      ? setCheckPasswords(e.target.value)
      : setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    isLogIn
      ? logIn(credentials)
          .then((res) => {
            setUid(res.data.uid);
            setRole(res.data.role);
            localStorage.setItem("loggedUser", res.data.token);
          })
          .catch((e) => alert("wrong email or password"))
          .finally(()=>{
            setIsAuth(true)
            setIsLoading(false)
            handleClose()
          })
      : handleSignUp();
  };

  const handleSignUp = () => {
    credentials.password === checkPasswords
      ? signUp(credentials)
          .then((res) => {
            setUid(res.data.uid);
            localStorage.setItem("loggedUser", res.data.token);
          })
          .catch((e) => alert(e))
          .finally(()=>{
            setIsAuth(true)
            setIsLoading(false)
            handleClose()
          })
      : alert("The passwords don't match");
  };

  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Modal open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Typography component="h1" variant="h5">
            {isLogIn ? "Log In" : "Sign Up"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <LogIn showPassword={showPassword} handleChange={handleChange} handleShowPassword={handleShowPassword}/>
              {!isLogIn && <SignUp handleChange={handleChange} handleShowPassword={handleShowPassword}/>}
            </Grid>
            <LoadingButton
              loading={isLoading}
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isLogIn ? "Log In" : "Sign Up"}
            </LoadingButton>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isLogIn
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Log in"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
}
