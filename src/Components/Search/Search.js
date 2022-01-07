import AdvancedSearch from "./AdvancedSearch";
import BasicSearch from "./BasicSearch";
import { FormControlLabel, Switch, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab/";
import { useContext, useEffect, useState } from "react";
import PetCard from "../PetCard/PetCard";
import useStyles from "./styles.js";
import { UserContext } from "../Context/userContext";

export default function Search() {
  const classes = useStyles();
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [petType, setPetType] = useState({ type: "" });
  const [advancedQuery, setAdvancedQuery] = useState({ status: "" });
  const { isLoading, searchResult, setSearchResult, setSearchQuery, pets } =
    useContext(UserContext);
  const [displayAll, setDisplayAll] = useState(false);

  useEffect(
    () => () => {
      setSearchResult([]);
    },
    [setSearchResult]
  );

  const handleChange = () => {
    setIsAdvanced((prevState) => !prevState);
    setAdvancedQuery({ status: "" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = { ...petType, ...advancedQuery };
    !searchQuery.type && delete searchQuery.type;
    !searchQuery.status && delete searchQuery.status;
    Object.keys(searchQuery).length > 0
      ? setSearchQuery(searchQuery)
      : setDisplayAll(true);
  };

  const clearForm = () => {
    setPetType({ type: "" });
    setAdvancedQuery({ status: "" });
    setDisplayAll(false);
    setSearchResult([]);
  };

  return (
    <>
      <form>
        <BasicSearch petType={petType} setPetType={setPetType} />
        {isAdvanced && (
          <AdvancedSearch
            advancedQuery={advancedQuery}
            setAdvancedQuery={setAdvancedQuery}
          />
        )}
        <FormControlLabel
          control={<Switch onChange={handleChange} />}
          label="Advanced search"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSearch}
        >
          Search
        </LoadingButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearForm}
          fullWidth
          sx={{ mt: 2 }}
        >
          Clear
        </Button>
      </form>
      <div className={classes.results}>
        {searchResult.length > 0
          ? searchResult.map((pet) => <PetCard pet={pet} key={pet.name} />)
          : displayAll &&
            pets.map((pet) => <PetCard pet={pet} key={pet.name} />)}
      </div>
    </>
  );
}
