import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { axios } from "../libs/axios";
import type { City } from "../types/types";
import { cn } from "../libs/cn";

type SearchInputProps = {
  search: (city: City) => void;
};

export const SearchInput = ({ search }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chosenCity, setChosenCity] = useState<City | null>(null);
  const [showList, setShowList] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data, isPending } = useQuery({
    queryKey: ["citiesData", debouncedSearch],
    queryFn: () =>
      axios(
        `search?name=${debouncedSearch}&count=10&language=en&format=json`,
      ).then((res) => res.data),
    enabled: debouncedSearch.length > 2,
  });

  const handleListClick = (city: City) => {
    setChosenCity(city);
    setShowList(false);
    setSearchTerm(city.name);
  };

  return (
    <div className="relative flex flex-col gap-2 md:flex-row md:flex-1 md:gap-3 items-center justify-center">
      <div className={cn("flex items-center justify-between gap-3 bg-Neutral-700 hover:bg-Neutral-600 border border-Neutral-600 rounded-lg w-full p-4 select-none", {"border-2 border-Neutral-0 px-[.95rem] py-[0.95rem]" : onFocus})}>
        <img src="/assets/images/icon-search.svg" alt="Search Icon" />
        <input
          className="flex-1 text-Neutral-200 outline-none bg-transparent"
          value={searchTerm}
          type="text"
          placeholder="Search for a place..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setShowList(true)
            setOnFocus(true)
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowList(false);
              setOnFocus(false)
            }
          }}
        />
      </div>

      {showList && searchTerm.length > 2 && (
        <>
          {isPending ? (
            <div className="absolute top-15 z-99 flex items-center justify-center gap-2 w-full md:w-3/4 left-0 bg-Neutral-700 border border-Neutral-600 text-Neutral-0 rounded-lg p-2 h-16">
              <img src="/assets/images/icon-loading.svg" alt="Icon loading search" />
              <span className="text-Neutral-200">Search in progress</span>
            </div>
          ) : (
            data.results && (
              <div className="absolute top-16 z-99 w-full overflow-y-auto scrollbar-custom bg-Neutral-700 md:w-3/4 left-0 border border-Neutral-600 text-Neutral-0 rounded-lg p-2 h-48">
                <ul className="space-y-2 mr-2">
                  {data.results.map((city: City) => (
                    <li
                      key={`city-${city.id}`}
                      className="cursor-pointer hover:bg-Neutral-600"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleListClick(city);
                      }}
                    >{`${city.name}, ${city.admin1}, ${city.country}`}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </>
      )}
      <button
        className="flex items-center justify-between gap-2 bg-Blue-500 hover:bg-Blue-700 rounded-xl w-full p-4 cursor-pointer md:w-1/4"
        onClick={() => chosenCity && search(chosenCity)}
      >
        <span className="flex text-2xl text-Neutral-0 font-dmSans items-center justify-center w-full">
          Search
        </span>
      </button>
    </div>
  );
};
