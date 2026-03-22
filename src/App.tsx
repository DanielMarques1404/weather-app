import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { useUnitContext } from "./app/hooks/useUnitContext";
import { DailyForecastInfo } from "./components/DailyForecastInfo/DailyForecastInfo";
import { Header } from "./components/layout/Header";
import { TodayInfo } from "./components/TodayInfo/TodayInfo";
import { type WeatherResult, getWeatherFor } from "./libs/utils";
import type { City } from "./types/types";
import { HourlyForecastInfo } from "./components/HourlyForecastInfo/HourlyForecastInfo";

function App() {
  const [city, setCity] = useState<City | null>(null);
  const { unit } = useUnitContext();

  const { data, isLoading } = useQuery<WeatherResult>({
    queryKey: ["weather", city?.id, unit],
    queryFn: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (city) {
            resolve(getWeatherFor(city, unit));
          } else {
            reject(new Error("Cidade não selecionada"));
          }
        }, 1500);
      }),
    enabled: !!city,
  });

  return (
    <main className="flex flex-col gap-4 w-88 md:w-full m-auto">
      <Header setCity={setCity} />
      {/* <DailyForecast city={city} /> */}
      {city && (
        <>
          <TodayInfo
            data={data?.currentData}
            city={city}
            isLoading={isLoading}
          />
          <DailyForecastInfo data={data?.dailyData} isLoading={isLoading} />
          <HourlyForecastInfo data={data?.hourlyData} isLoading={isLoading} />
        </>
      )}
    </main>
  );
}

export default App;
