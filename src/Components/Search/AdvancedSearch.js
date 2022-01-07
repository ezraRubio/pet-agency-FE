import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function AdvancedSearch({ advancedQuery, setAdvancedQuery }) {
  const statuses = ["Available", "Fostered", "Adopted"];

  const handleChange = (e) => {
    setAdvancedQuery({ ...advancedQuery, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormControl fullWidth>
        <TextField
          name="name"
          value={advancedQuery.name ? advancedQuery.name : ""}
          variant="outlined"
          label="Name"
          fullWidth
          sx={{ mt: 2 }}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Adoption Status</InputLabel>
        <Select
          value={advancedQuery.status}
          name="status"
          variant="outlined"
          label="Adoption Status"
          onChange={handleChange}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="height"
        variant="outlined"
        label="Height"
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        value={+advancedQuery.height}
        onChange={handleChange}
      />
      <TextField
        name="weight"
        variant="outlined"
        label="Weight"
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        value={+advancedQuery.weight}
        onChange={handleChange}
      />
    </>
  );
}
