import { cn } from "../libs/cn";
import { ImperialUnit, MetricsUnit } from "../libs/utils";
import type { Unit } from "../types/types";

type UnitItemProps = {
    label: string,
    field: "temperature" | "windSpeed" | "precipitation",
    unit: Unit
}

export const UnitItem = ({ label, field, unit }: UnitItemProps) => {

const defaultStyle = "flex text-Neutral-0 font-dmSans px-2 py-1"

  return (
    <div className="flex flex-col items-start gap-1 px-2 py-1 w-full">
      <span className="text-Neutral-300 text-sm">{label}</span>
      <span className={cn(defaultStyle, {"bg-Neutral-600 rounded-md w-full": unit === MetricsUnit})}>
        {MetricsUnit[field]}
      </span>
      <span className={cn(defaultStyle, {"bg-Neutral-600 rounded-md w-full": unit === ImperialUnit})}>
        {ImperialUnit[field]}
      </span>
    </div>
  );
};
