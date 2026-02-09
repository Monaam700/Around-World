import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const options = [
  { value: "all regions", label: "All regions" },
  { value: "africa", label: "Africa" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

export default function RegionMenu({ CountryList, filterCountriesList }) {
  const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState("");

  const HandelRagionChange = (option) => {
    if (!option) return;

    if (option.value === "all regions") {
      filterCountriesList(CountryList);
      return;
    }

    const filterCountries = CountryList.filter(
      (country) => country.region.toLowerCase() === option.value,
    );

    filterCountriesList(filterCountries);
  };

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <div className="w-72">
      <Combobox
        value={selected}
        //onChange={setSelected}
        onChange={(option) => {
          setSelected(option);
          HandelRagionChange(option);
        }}
      >
        <div className="relative mt-1">
          {/* Input */}
          <Combobox.Input
            className="h-12 w-full rounded-md border border-gray-300 pr-10 pl-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            displayValue={(option) => (option ? option.label : "")}
            onChange={(event) => {
              setQuery(event.target.value);
              //HandelRagionChange;
              console.log("Input Changed");
            }}
            placeholder="Search for a region..."
          />

          {/* Icon */}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400 dark:text-gray-300"
              aria-hidden="true"
            />
          </Combobox.Button>

          {/* Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-gray-900 shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-900 dark:text-gray-100">
              {filteredOptions.length === 0 ? (
                <div className="cursor-default px-4 py-2 text-gray-700 select-none dark:text-gray-300">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 select-none ${
                        active
                          ? "bg-blue-500 text-white dark:bg-blue-600"
                          : "text-gray-900 dark:text-gray-100"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center justify-between">
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : ""
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <CheckIcon
                            className={`h-5 w-5 ${
                              active
                                ? "text-white"
                                : "text-blue-500 dark:text-blue-400"
                            }`}
                          />
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
