import type { HourlyData } from "../../types/types";
import { Item } from "./Item";

type HourListProps = {
  data: HourlyData | undefined;
  day: number;
  isLoading: boolean;
};

export const HourList = ({ data, day, isLoading }: HourListProps) => {
  if (isLoading)
    return (
      <ul className="space-y-2 mr-2">
        {Array.from({ length: 24 }, (_, idx) => (
          <li key={`hourly-${idx}`}>
            <Item data={data} index={idx} day={day} isLoading={isLoading} />
          </li>
        ))}
      </ul>
    );
  return (
    <ul className="space-y-2 mr-2">
      {data?.time[day].map((_, idx) => (
        <li key={`hourly-${idx}`}>
          <Item data={data} index={idx} day={day} isLoading={isLoading} />
        </li>
      ))}
    </ul>
  );
};
