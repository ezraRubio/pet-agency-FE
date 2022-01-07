import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    padding: "2rem",
  },
  button: {
    marginTop: "2rem",
  },
}));
