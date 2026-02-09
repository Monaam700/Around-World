import CountryList from "../components/CountryList";
import RegionMenu from "../components/RegionMenu";
import SearchInput from "../components/SearchInput";
import ShowMessage from "../components/ShowMessage";
import { useFetchData } from "../useFetchData";

const Home = () => {
  const {
    result,
    filteredCountries,
    isError,
    isLoading,
    setFilteredCountries,
  } = useFetchData();

  return (
    <>
      {isError && <ShowMessage message="Something went wrong!" />}
      {isLoading && <ShowMessage message="Loading countries data...!" />}

      {!isError && !isLoading && (
        <>
          <div className="container flex flex-col justify-between gap-10 md:h-14 md:flex-row md:gap-0">
            <SearchInput
              CountryList={result}
              filterCountriesList={setFilteredCountries}
            />
            <RegionMenu
              CountryList={result}
              filterCountriesList={setFilteredCountries}
            />
          </div>

          <CountryList data={filteredCountries} />
        </>
      )}
    </>
  );
};

export default Home;
