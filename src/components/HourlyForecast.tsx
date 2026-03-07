import { useState } from "react";
import { getOpenMeteoIconName } from "../libs/utils";
import type { HourlyData } from "../types/types";
import { ItemList } from "./ItemList";
import { WeekdaySelected } from "./WeekdaysCombo";

type HourlyForecastProps = {
  hourly: HourlyData;
};

export const HourlyForecast = ({ hourly }: HourlyForecastProps) => {
  const [day, setDay] = useState(0);
  // const time = hourly.time.map((hourly: any) => hourly.toLocaleTimeString("en-us", { hour: "2-digit" }));

  const temperature = hourly.temperature_2m.map((temp: any) =>
    Math.floor(temp),
  );
  const weatherIcon = hourly.weather_code.map(
    (code: any) => `/assets/images/icon-${code}.webp`,
  );

  const handleWeekdayChange = (weekdays: string) => {
    console.log(weekdays);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-around rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 w-full h-96">
      <div className="flex flex-col items-center justify-between px-2 w-full overflow-hidden">
        <div className="flex items-center justify-between mb-4 w-full">
          <span className="font-dmSans text-md text-start font-bold text-Neutral-0 w-3/5">
            Hourly Forecast
          </span>
          <button className="w-2/5">
            <WeekdaySelected
            weekday={{
              value: 0,
              label: hourly.time[day][0].toLocaleString("en-US", {
                weekday: "long",
              }),
            }}
            onclick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          </button>
        </div>
        <div className="w-full overflow-y-auto scrollbar-custom">
          <ul className="space-y-2 mr-2">
            {hourly.time[day].map((item, idx) => (
              <li key={`hourly-${idx}`}>
                <ItemList
                  weatherIcon={`/assets/images/icon-${getOpenMeteoIconName(hourly.weather_code[day][idx])}.webp`}
                  hour={item.toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                  temperature={Number(
                    hourly.temperature_2m[day][idx].toFixed(0),
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
