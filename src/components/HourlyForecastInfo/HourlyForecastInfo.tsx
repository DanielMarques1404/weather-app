import { useState } from "react";
import type { HourlyData } from "../../types/types";
import { HourList } from "./HourList";
import { WeekdaysList } from "./WeekdaysList";
import { WeekdaySelect } from "./WeekdaySelect";

type HourlyForecastInfoProps = {
  data: HourlyData | undefined;
  isLoading: boolean;
};

export const HourlyForecastInfo = ({
  data,
  isLoading,
}: HourlyForecastInfoProps) => {
  const [day, setDay] = useState(0);
  const [showListWeekdays, setShowListWeekdays] = useState(false);

  const handleWeekdayChange = (weekdayIndex: number) => {
    setDay(weekdayIndex);
    setShowListWeekdays(false);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-around rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 w-full h-96">
      <div className="relative flex flex-col items-center justify-between px-2 w-full overflow-hidden">
        <div className="flex items-center justify-between mb-4 w-full">
          <span className="font-dmSans text-md text-start font-bold text-Neutral-0 w-3/5">
            Hourly Forecast
          </span>
          <div className="w-2/5">
            <WeekdaySelect
              label={data?.time[day][0].toLocaleString("en-US", {
                weekday: "long",
              })}
              onclick={() => setShowListWeekdays(!showListWeekdays)}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="w-full overflow-y-auto scrollbar-custom">
          <HourList data={data} day={day} isLoading={isLoading} />
        </div>

        {showListWeekdays && (
          <div className="absolute right-2 top-10">
            <WeekdaysList
              indexList={[1, 2, 3, 4, 5, 6, 0]}
              onclick={handleWeekdayChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
