import { ImageList, ImageListItem, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/userContext";
import shuffle from "lodash.shuffle";
import { getUserById } from "../../api";

export default function Home() {
  const { pets, isAuth, uid } = useContext(UserContext);
  const [display, setDisplay] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);

  useEffect(() => setDisplay(shuffle(pets).slice(0, 20)), [pets]);
  useEffect(() => {
    uid &&
      getUserById(uid)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
        })
        .catch((e) => console.log(e.message));
  }, [uid]);

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6">
        {!isAuth
          ? "Welcome, check our pets by searching, or log in to adopt"
          : `Welcome back, ${firstName} ${lastName}`}
      </Typography>
      <ImageList cols={5} rowHeight={164} sx={{ overflowY: "hidden" }}>
        {display.map((pet) => (
          <ImageListItem key={pet._id}>
            <img
              src={`${
                pet.picture
                  ? pet.picture
                  : "https://images.dog.ceo/breeds/setter-gordon/n02101006_776.jpg"
              }?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${
                pet.picture
                  ? pet.picture
                  : "https://images.dog.ceo/breeds/setter-gordon/n02101006_776.jpg"
              }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={pet.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
