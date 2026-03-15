import { useContext } from "react";
import { UnitContext } from "../context/UnitContext";

export const useUnitContext = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("Unavailable Cart Context");
  }
  return context;
};
