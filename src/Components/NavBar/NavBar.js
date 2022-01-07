import { useState, useContext } from "react";
import useStyles from "./styles";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthModal from "./AuthModal/AuthModal";
import DrawerItem from "./DrawerItem";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { isAuth, setUid } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;

    setDrawer(open);
  };

  const logOut = () => {
    localStorage.clear();
    setUid("");
    navigate("/");
  };

  const goSearch = () => {
    navigate("/search");
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        {!isAuth ? (
          <Button color="inherit" onClick={goSearch}>
            Search
          </Button>
        ) : (
          <Toolbar>
            <Drawer open={drawer} onClose={toggleDrawer(false)}>
              <DrawerItem handleOpen={handleOpen} />
            </Drawer>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        )}
        <Button onClick={() => navigate("/")}>
          <Typography className={classes.heading} variant="h4" align="center">
            Pet Agency
          </Typography>
        </Button>
        {isAuth ? (
          <Button color="inherit" onClick={logOut}>
            Log Out
          </Button>
        ) : (
          <Button color="inherit" onClick={handleOpen}>
            Log In/Sign Up
          </Button>
        )}
      </AppBar>
      <AuthModal handleClose={handleClose} open={modal} />
    </>
  );
}
