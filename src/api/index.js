import axios from "axios";

const API = axios.create({ baseURL: "https://pet-agency-be.herokuapp.com/" });
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("loggedUser");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getPets = async (searchQuery) =>
  await API.get("/search", { params: searchQuery });
export const addPet = async (newPet) => await API.post("/pet", newPet);
export const savePet = async (petId) => await API.post(`/pet/${petId}/save`);
export const adoptPet = async (petId, isFostering) =>
  await API.post(`/pet/${petId}/adopt`, isFostering);
export const returnPet = async (petId) =>
  await API.post(`/pet/${petId}/return`);
export const getPetById = async (petId) => await API.get(`/pet/${petId}`);
export const editPet = async (petId, editedPet) =>
  await API.put(`/pet/${petId}`, editedPet);
export const deletePet = async (petId) =>
  await API.delete(`/pet/${petId}/save`);
export const getPetsByUser = async (userId) =>
  await API.get(`/pet/user/${userId}`);
export const getUserById = async (userId) => await API.get(`/user/${userId}`);
export const editUser = async (userId, editedUser) =>
  await API.put(`/user/${userId}`, editedUser);
export const getUsers = async () => await API.get("/user");
export const logIn = async (credentials) =>
  await API.post("/login", credentials);
export const signUp = async (credentials) =>
  await API.post("/signup", credentials);

export const checkToken = async () => await API.get("/user/token");
