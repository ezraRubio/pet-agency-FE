import { makeStyles } from "@mui/styles";

export default makeStyles({
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "3em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "35%",
    width: "35%",
  },
  scroll: {
    overflowY: "scroll",
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "auto",
  },
});
