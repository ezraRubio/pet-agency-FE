import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";

export default function DrawerItem({ handleOpen }) {
  const { isAuth, role } = useContext(UserContext);
  const allUsersMenu = ["Home", "Search"]
  const [specialMenu, setSpecialMenu] = useState([])

  useEffect(()=>{
    role==="admin"
    ?setSpecialMenu(["Dashboard", "Add pet"])
    :setSpecialMenu(["Profile", "My pets"])
  }, [role])

  const pathSelect = (text) => {
    switch (text) {
      case "Search":
        return "/search"
      case "Profile":
        return "/profile"
      case "My pets":
        return "/my-pets"
      case "Dashboard":
        return "/admin/dashboard"
      case "Add pet":
        return "/admin/add"
      default:
        return "/"
    }
  }

  return (
    <Box role="presentation">
      {isAuth ? (
        <>
          <List>
            {allUsersMenu.map((text, index) => (
              <Link
                to={pathSelect(text)}
                style={{ textDecoration: "none" }}
                key={text}
              >
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 === 0 ? <HomeIcon /> : <SearchIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {specialMenu.map((text, index) => (
              <Link
                to={pathSelect(text)}
                style={{ textDecoration: "none" }}
                key={text}
              >
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 === 0 ? <PersonIcon /> : <PetsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      ) : (
        <>
          <List>
            <ListItem button onClick={handleOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Log In/Sign Up" />
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
}
