import { createContext, useEffect, useState } from "react";
import { getPets, getPetsByUser, checkToken } from "../../api";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [uid, setUid] = useState();
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [pets, setPets] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [selectedPet, setSelectedPet] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkToken()
      .then((res) => {
        setRole(res.data.role);
        setUid(res.data.uid);
        setIsAuth(true);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    uid &&
      getPetsByUser(uid)
        .then((res) => {
          res.data.saved && setSavedPets(res.data.saved);
          res.data.adopted && setAdoptedPets(res.data.adopted);
        })
        .catch((e) => console.log(e));
  }, [uid]);

  useEffect(() => {
    setIsLoading(true);
    getPets(searchQuery)
      .then((res) => {
        res.status === 200 && Object.keys(searchQuery).length > 0
          ? setSearchResult(res.data)
          : setPets(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [searchQuery, refresh]);

  useEffect(() => {
    uid ? setIsAuth(true) : setIsAuth(false);
  }, [uid]);

  return (
    <UserContext.Provider
      value={{
        pets,
        isAuth,
        role,
        uid,
        refresh,
        isLoading,
        savedPets,
        adoptedPets,
        searchQuery,
        searchResult,
        selectedPet,
        setUid,
        setRole,
        setPets,
        setRefresh,
        setSavedPets,
        setAdoptedPets,
        setSearchQuery,
        setSearchResult,
        setSelectedPet,
        setIsLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
