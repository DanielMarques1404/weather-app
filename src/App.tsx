import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { useUnitContext } from "./app/hooks/useUnitContext";
import { DailyForecastInfo } from "./components/DailyForecastInfo/DailyForecastInfo";
import { ErrorApi } from "./components/ErrorApi";
import { HourlyForecastInfo } from "./components/HourlyForecastInfo/HourlyForecastInfo";
import { Header } from "./components/Search/Header";
import { Search } from "./components/Search/Search";
import { TodayInfo } from "./components/TodayInfo/TodayInfo";
import { type WeatherResult, getWeatherFor } from "./libs/utils";
import type { City } from "./types/types";

function App() {
  const [city, setCity] = useState<City | null>(null);
  const [retry, setRetry] = useState(0);
  const { unit } = useUnitContext();

  const { data, isLoading, isError } = useQuery<WeatherResult>({
    queryKey: ["weather", city?.id, unit, retry],
    queryFn: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (city) {
            resolve(getWeatherFor(city, unit));
          } else {
            reject(new Error("Cidade não selecionada"));
          }
        }, 200);
      }),
    enabled: !!city,
  });

  return (
    <div className="flex flex-col gap-4 w-92 px-2 md:w-full md:px-6 m-auto">
      <header>
        <Header />
        {!isError && <Search setCity={setCity} />}
      </header>
      <main>
        {isError ? (
          <ErrorApi onclick={() => setRetry(retry + 1)} />
        ) : city ? (
          <div className="flex flex-col gap-4 md:flex-row">
            <section className="flex flex-col gap-4 md:flex-1 md:w-full">
              <div className="w-full">
                <TodayInfo
                  data={data?.currentData}
                  city={city}
                  isLoading={isLoading}
                />
              </div>
              <div className="w-full">
                <DailyForecastInfo
                  data={data?.dailyData}
                  isLoading={isLoading}
                />
              </div>
            </section>
            <section className="w-full md:w-1/3 md:h-auto">
              <HourlyForecastInfo
                data={data?.hourlyData}
                isLoading={isLoading}
              />
            </section>
          </div>
        ) : (
          <h3 className="font-dmSans font-bold text-Neutral-0">
            No search result found!
          </h3>
        )}
      </main>
    </div>
  );
}

export default App;
