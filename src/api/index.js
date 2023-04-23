import axios from "axios";

const API = axios.create({ baseURL: "https://ill-pear-firefly-tutu.cyclic.app/" });
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("loggedUser");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getPets = async (searchQuery) =>
  await API.get("/search", { params: searchQuery });
  
export const addPet = async (newPet) => await API.post("/pet", newPet);

export const savePet = async (petId) => await API.post(`/pet/${petId}/save`);

export const adoptPet = async (petId) =>
  await API.post(`/pet/${petId}/adopt`);

export const returnPet = async (petId) =>
  await API.delete(`/pet/${petId}/adopt`);

export const getPetById = async (petId) => await API.get(`/pet/${petId}`);

export const editPet = async (petId, editedPet) =>
  await API.put(`/pet/${petId}`, editedPet);

export const unSavePet = async (petId) =>
  await API.delete(`/pet/${petId}/save`);

export const getPetsByUser = async (userId) =>
  await API.get(`/user/${userId}/pets`);

export const getUserById = async (userId) => await API.get(`/user/${userId}`);

export const editUser = async (userId, editedUser) =>
  await API.put(`/user/${userId}`, editedUser);

export const getUsers = async () => await API.get("/user");

export const logIn = async (credentials) =>
  await API.post("/log_in", credentials);

export const signUp = async (credentials) =>
  await API.post("/sign_up", credentials);

