import { Container } from "@mui/material";
import Form from "./Components/Admin/AddPet/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Search from "./Components/Search/Search";
import Home from "./Components/Views/Home";
import Profile from "./Components/Profile/Profile";
import MyPets from "./Components/MyPets/MyPets";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import UserContextProvider from "./Components/Context/userContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Container maxWidth="lg">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-pets" element={<MyPets />} />
            <Route path="/admin/add" element={<Form />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
