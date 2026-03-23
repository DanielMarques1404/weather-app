import type { DailyData } from "../../types/types";
import { SimpleCard } from "./SimpleCard";

type DailyForecastInfoProps = {
  data: DailyData | undefined;
  isLoading: boolean;
};

export const DailyForecastInfo = ({
  data,
  isLoading,
}: DailyForecastInfoProps) => {
  if (isLoading)
    return (
      <ul className="grid grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5, 6].map((_, idx) => (
          <SimpleCard weekday={""} data={undefined} index={idx} isLoading />
        ))}
      </ul>
    );

  return (
    <div className="flex flex-col gap-2">
      <span className="font-dmSans text-md text-start font-bold text-Neutral-0">
        Daily forecast
      </span>
      <ul className="grid grid-cols-3 md:grid-cols-7 gap-3">
        {data!.time.map((time, idx) => (
          <li key={idx}>
            <SimpleCard
              weekday={time.toLocaleDateString("en-us", {
                weekday: "short",
              })}
              data={data}
              index={idx}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
