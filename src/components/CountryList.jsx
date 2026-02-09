import CountryCard from "./CountryCard";
import EmptySearch from "./EmptySearch";

export default function CountryList({ data }) {
  return (
    <div className="container mt-8 grid justify-items-center gap-7.5 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
      {data && data.length ? (
        data.map((country) => {
          return (
            <CountryCard
              key={country.name.official}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital[0]}
              flag={country.flags.png}
            />
          );
        })
      ) : (
        <EmptySearch />
      )}
    </div>
  );
}
