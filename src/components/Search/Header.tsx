import { UnitButton } from "../Config";


export const Header = () => {
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
    </section>
  );
};
