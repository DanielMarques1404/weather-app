import { useState } from "react";
import { useUnitContext } from "../app/hooks/useUnitContext";
import { ImperialUnit } from "../libs/utils";
import { UnitItem } from "./UnitItem";
import { cn } from "../libs/cn";

export const UnitButton = () => {
  const [open, setOpen] = useState(false);
  const { unit, switchUnit } = useUnitContext();

  return (
    <div className="relative flex flex-col gap-2 w-full items-end justify-center">
      <div
        className={cn("flex items-center justify-end gap-2 bg-Neutral-700 font-dmSans text-sm text-Neutral-0 px-3 py-2 cursor-pointer rounded-md", {"border border-Neutral-0 px-[0.7rem] py-[0.45rem]" : open})}
        onClick={() => setOpen(!open)}
      >
        <img src="/assets/images/icon-units.svg" alt="Units button" />
        <span className="font-dmSans text-Neutral-200">Units</span>
        <img src="/assets/images/icon-dropdown.svg" alt="Dropdown button" />
      </div>
      {open && (
        <div className="absolute top-10 cursor-pointer flex flex-col border border-Neutral-600 rounded-xl p-1 z-10 bg-Neutral-800 w-56 font-dmSans">
          <span
            className="text-Neutral-0 hover:bg-Neutral-600 hover:border hover:border-Neutral-0 hover:px-[0.7rem] hover:py-[0.45rem] rounded-md px-3 py-2 flex"
            onClick={switchUnit}
          >{`Switch to ${unit === ImperialUnit ? "Metrics" : "Imperial"}`}</span>
          <UnitItem label={"Temperature"} field={"temperature"} unit={unit} />
          <span className="w-full border border-Neutral-600"></span>
          <UnitItem label={"Wind Speed"} field={"windSpeed"} unit={unit} />
          <span className="w-full border border-Neutral-600"></span>
          <UnitItem
            label={"Precipitation"}
            field={"precipitation"}
            unit={unit}
          />
        </div>
      )}
    </div>
  );
};
