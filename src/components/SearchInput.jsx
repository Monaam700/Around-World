export default function SearchInput({ CountryList, filterCountriesList }) {
  const searchHandler = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    const filterdCountries = !searchTerm
      ? CountryList
      : CountryList.filter((country) =>
          country.name.official
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );

    filterCountriesList(filterdCountries);
  };
  return (
    <form className="" onSubmit={searchHandler}>
      <div className="relative flex w-full max-w-md items-center">
        <svg
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>

        <input
          type="text"
          name="search"
          placeholder="Search for a country..."
          className="h-12 w-full rounded-full border border-gray-300 pr-4 pl-12 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>
    </form>
  );
}
