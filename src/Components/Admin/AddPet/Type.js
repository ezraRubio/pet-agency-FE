import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export default function Type({pet, setPet}) {
  const types = ["Dog", "Cat"];

    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            required
            variant="outlined"
            label="Type"
            value={pet.type}
            onChange={(e) => setPet({ ...pet, type: e.target.value })}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    )
}
