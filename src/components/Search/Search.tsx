import type { City } from "../../types/types";
import { SearchInput } from "./SearchInput";

type SearchProps = {
    setCity: (city: City) => void;
}

export const Search = ({setCity}: SearchProps) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="font-bricolageGrotesque text-Neutral-0 my-4 p-2">
        How's the sky looking today?
      </h1>

      <section className="my-2 space-y-2 w-full md:w-1/2 md:mx-auto">
        <SearchInput search={(city) => setCity(city)} />
      </section>
    </section>
  );
};
