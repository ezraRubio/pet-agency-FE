import { Typography } from "@mui/material";
import Pets from "./Pets";
import Users from "./Users";

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" component="h2" sx={{ margin: "1rem" }}>
        Users
      </Typography>
      <Users />
      <Typography variant="h4" component="h2" sx={{ margin: "1rem" }}>
        Pets
      </Typography>
      <Pets />
    </>
  );
}
