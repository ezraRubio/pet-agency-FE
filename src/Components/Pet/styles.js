import { makeStyles } from '@mui/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '35%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '85%',
    width: '80%'
  },
  cardActions: {
    justifyContent:"space-between"
  },
  cardLink: {
    textDecoration: "none"
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  title: {
    padding: '0 16px',
  },
  scroll: {
    overflowY: "scroll",
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "auto"
  }
});
