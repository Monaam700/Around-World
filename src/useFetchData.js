import { useEffect, useState } from "react";

export const useFetchData = (country) => {
  const [result, setResult] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        if (country) {
          await fetchCountryData(country);
        } else {
          await fetchAllCountries();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [country]);

  const fetchCountryData = async (countryName) => {
    try {
      const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Country data:", data);

      if (data && data.length > 0) {
        setResult(data[0]);
        setFilteredCountries([]);
      } else {
        setResult({});
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
      setIsError(true);
      setResult({});
    }
  };

  const fetchAllCountries = async () => {
    try {
      const cachedData = localStorage.getItem("countries");

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setResult(parsedData);
        setFilteredCountries(parsedData);
        return;
      }

      const url =
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("All countries:", data);

      setResult(data);
      setFilteredCountries(data);
      localStorage.setItem("countries", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching all countries:", error);
      setIsError(true);
      setResult([]);
      setFilteredCountries([]);
    }
  };

  const filterCountries = (searchTerm) => {
    if (!searchTerm) {
      setFilteredCountries(result);
      return;
    }

    const filtered = result.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCountries(filtered);
  };

  return {
    result,
    filteredCountries,
    setFilteredCountries,
    filterCountries,
    isLoading,
    isError,
  };
};
