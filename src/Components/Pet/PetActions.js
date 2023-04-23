import { CardActions, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { adoptPet, unSavePet, returnPet, savePet } from "../../api/index.js";
import { UserContext } from "../Context/userContext.js";

export default function PetActions({ classes, pet }) {
  const {
    adoptedPets,
    setAdoptedPets,
    savedPets,
    setSavedPets,
    setSelectedPet,
  } = useContext(UserContext);
  const [isPetAdopted, setIsPetAdopted] = useState(false);
  const [isPetSaved, setIsPetSaved] = useState(false);

  useEffect(() => {
    adoptedPets &&
      setIsPetAdopted(adoptedPets.some((userPet) => userPet._id === pet._id));
  }, [adoptedPets, pet._id]);

  useEffect(() => {
    savedPets &&
      setIsPetSaved(savedPets.some((userPet) => userPet._id === pet._id));
  }, [savedPets, pet._id]);

  const handleSave = () => {
    savePet(pet._id)
      .then((res) => {
        const saved = res.data;
        setSavedPets(saved);
        alert(`${saved[saved.length - 1].name} was saved`);
      })
      .catch((e) => console.log(e));
  };

  const handleAdopt = (isFostering) => {
    adoptPet(pet._id, { isFostering }).then((res) => {
      const adopted = res.data;
      setAdoptedPets(adopted);
      alert(
        `${adopted[adopted.length - 1].name} was ${
          isFostering ? "fostered" : "adopted"
        }`
      );
      isFostering
        ? setSelectedPet((prevState) => ({ ...prevState, status: "Fostered" }))
        : setSelectedPet((prevState) => ({ ...prevState, status: "Adopted" }));
    });
  };

  const handleDelete = () => {
    unSavePet(pet._id)
      .then((res) => {
        const saved = res.data;
        setSavedPets(saved);
        alert(`${pet.name} was remove from save pets`);
      })
      .catch((e) => console.log(e));
  };

  const handleReturn = () => {
    returnPet(pet._id)
      .then((res) => {
        const adopted = res.data;
        setAdoptedPets(adopted);
        alert(`${pet.name} was returned`);
        setSelectedPet((prevState) => ({ ...prevState, status: "Available" }));
      })
      .catch((e) => console.log(e));
  };

  return (
    <CardActions className={classes.cardActions}>
      {isPetAdopted ? (
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
