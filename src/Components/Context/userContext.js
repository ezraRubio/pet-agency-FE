import { createContext, useEffect, useState } from "react";
import { getPets, getPetsByUser } from "../../api";
import jwt_decode from "jwt-decode";

const isTokenExpired = (decodedToken) => {
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) return true
  
  return false 
};

export const checkToken = () => {
  const token = localStorage.getItem("loggedUser")
  if(!token) return null
  const tokenDecoded = token && jwt_decode(token)
  if (isTokenExpired(tokenDecoded)) {
    localStorage.clear()
    return null
  }
  return tokenDecoded
}

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
    const tokenDecoded = checkToken();

    if (tokenDecoded) {
      setUid(()=>tokenDecoded.uid)
      setRole(()=>tokenDecoded.role)
      setIsAuth(true)
    }
  }, []);

  useEffect(() => {
    uid &&
      getPetsByUser(uid)
        .then((res) => {
          res.data.savedPets && setSavedPets(res.data.savedPets);
          res.data.adoptedPets && setAdoptedPets(res.data.adoptedPets);
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
        setIsAuth,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
