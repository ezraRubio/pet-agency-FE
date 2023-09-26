import { CardActions, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { adoptPet, unSavePet, returnPet, savePet } from "../../api/index.js";
import { UserContext } from "../Context/userContext.js";

export default function PetActions({ classes }) {
  const {
    adoptedPets,
    setAdoptedPets,
    savedPets,
    setSavedPets,
    setSelectedPet,
    selectedPet,
  } = useContext(UserContext);
  const [isPetAdopted, setIsPetAdopted] = useState(false);
  const [isAdoptedByOtherUser, setIsAdoptedByOtherUser] = useState(false);
  const [isPetSaved, setIsPetSaved] = useState(false);

  useEffect(() => {
    if (adoptedPets.some((userPet) => userPet._id === selectedPet._id))
      setIsPetAdopted(true);
    else if (selectedPet.status === "Adopted") setIsAdoptedByOtherUser(true);
  }, [adoptedPets, selectedPet.status, selectedPet._id]);

  useEffect(() => {
    savedPets &&
      setIsPetSaved(savedPets.some((userPet) => userPet._id === selectedPet._id));
  }, [savedPets, selectedPet._id]);

  const handleSave = () => {
    savePet(selectedPet._id)
      .then((res) => {
        const saved = res.data;
        setSavedPets(saved);
        alert(`${saved[saved.length - 1].name} was saved`);
      })
      .catch((e) => console.log(e));
  };

  const handleAdopt = () => {
    adoptPet(selectedPet._id).then((res) => {
      const adopted = res.data;
      setAdoptedPets(adopted);
      alert(`${adopted[adopted.length - 1].name} was adopted`);
      setSelectedPet((prevState) => ({ ...prevState, status: "Adopted" }));
    });
  };

  const handleDelete = () => {
    unSavePet(selectedPet._id)
      .then((res) => {
        const saved = res.data;
        setSavedPets(saved);
        alert(`${selectedPet.name} was remove from save pets`);
      })
      .catch((e) => console.log(e));
  };

  const handleReturn = () => {
    returnPet(selectedPet._id)
      .then((res) => {
        const adopted = res.data;
        setAdoptedPets(adopted);
        alert(`${selectedPet.name} was returned`);
        setSelectedPet((prevState) => ({ ...prevState, status: "Available" }));
      })
      .catch((e) => console.log(e));
  };

  return (
    <CardActions className={classes.cardActions}>
      {isAdoptedByOtherUser ? (
        <></>
      ) : isPetAdopted ? (
        <Button size="small" color="primary" onClick={handleReturn}>
          Return Pet
        </Button>
      ) : (
        <Button size="small" color="primary" onClick={handleAdopt}>
          Adopt
        </Button>
      )}
      {isPetSaved ? (
        <Button size="small" color="primary" onClick={handleDelete}>
          Remove from saved
        </Button>
      ) : (
        <Button size="small" color="primary" onClick={handleSave}>
          Save
        </Button>
      )}
    </CardActions>
  );
}
