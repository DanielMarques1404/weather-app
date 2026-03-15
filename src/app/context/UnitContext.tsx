import { createContext, useState, type ReactNode } from "react";
import { MetricsUnit, ImperialUnit } from "../../libs/utils";
import type { Unit } from "../../types/types";

type UnitContextType = {
  unit: Unit;
  switchUnit: () => void;
};

export const UnitContext = createContext<UnitContextType | undefined>(
  undefined,
);

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<Unit>(MetricsUnit);

  const switchUnit = () => {
    if (unit === MetricsUnit) setUnit(ImperialUnit);
    else setUnit(MetricsUnit);
  };

  const value = {
    unit,
    switchUnit,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};
