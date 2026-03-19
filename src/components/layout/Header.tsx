import type { City } from "../../types/types";
import { UnitButton } from "../Config";
import { SearchInput } from "../Search";

type HeaderProps = {
    setCity: (city: City) => void;
}

export const Header = ({ setCity }: HeaderProps) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <section className="flex w-full items-center justify-between p-1">
        <img
          className="w-36"
          src="/assets/images/logo.svg"
          alt="Logo Weather App"
        />
        <UnitButton />
      </section>

      <h1 className="font-bricolageGrotesque text-Neutral-0 my-4 p-2">
        How's the sky looking today?
      </h1>

      <section className="my-2 space-y-2">
        <SearchInput search={(city) => setCity(city)} />
      </section>
    </section>
  );
};
