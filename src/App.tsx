import { useEffect, useState } from "react";
import "./App.css";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { QuickInfo } from "./components/QuickInfo";
import { SearchInput } from "./components/Search";
import { Today } from "./components/Today";
import { OpenMeteoApi } from "./libs/open-meteo-api";
import { getOpenMeteoIconName } from "./libs/utils";
import type { City, CurrentData, DailyData, HourlyData } from "./types/types";

function App() {
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("chegando no fetch", city);
      if (!city) return;
      const omApi = new OpenMeteoApi(city.latitude, city.longitude);
      await omApi.fetchWeather();
      setCurrentData(omApi.getCurrentData());
      setDailyData(omApi.getDailyData());
      setHourlyData(omApi.getHourlyData());
    };

    fetchData();
  }, [city]);

  return (
    <main className="flex flex-col gap-4 w-88 m-auto">
      <section className="flex items-center justify-between p-1">
        <img src="/assets/images/logo.svg" alt="Logo Weather App" />
        <div className="text-Neutral-0">Units</div>
      </section>

      <h1 className="font-bricolageGrotesque text-Neutral-0">
        How's the sky looking today?
      </h1>

      <section className="my-2 space-y-2">
        <SearchInput search={(city) => setCity(city)} />
      </section>

      {currentData && dailyData && hourlyData ? (
        <>
          <section>
            <Today
              variant={"small"}
              temperature={Math.floor(currentData.temperature_2m)}
              date={currentData.date}
              city={`${city?.name}, ${city?.country}`}
              weatherIcon={`/assets/images/icon-${getOpenMeteoIconName(currentData.weather_code)}.webp`}
            />
          </section>

          <section className="grid grid-cols-2 grid-rows-2 gap-4">
            <QuickInfo
              label={"Feels like"}
              info={`${Math.floor(currentData.apparent_temperature)}°`}
            />
            <QuickInfo
              label={"Humidity"}
              info={`${Math.floor(currentData.relative_humidity_2m)}%`}
            />
            <QuickInfo
              label={"Wind"}
              info={`${Math.floor(currentData.wind_speed_10m)} km/h`}
            />
            <QuickInfo
              label={"Precipitation"}
              info={`${Math.floor(currentData.precipitation)} mm`}
            />
          </section>

          <section>
            <span className="flex items-center justify-start text-Neutral-0 font-dmSans font-bold my-2">
              Daily Forecast
            </span>
            <ul className="grid grid-cols-3 gap-3">
              {dailyData.time.map((time, idx) => (
                <li key={idx}>
                  <DailyForecast
                    weekday={time.toLocaleDateString("en-us", {
                      weekday: "short",
                    })}
                    icon={`/assets/images/icon-${getOpenMeteoIconName(dailyData.weather_code[idx])}.webp`}
                    minTemperature={Math.floor(
                      dailyData.temperature_2m_min[idx],
                    )}
                    maxTemperature={Math.floor(
                      dailyData.temperature_2m_max[idx],
                    )}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <HourlyForecast hourly={hourlyData} />
          </section>
        </>
      ) : (
        <h2 className="text-Neutral-0 font-semibold">
          No search result found!
        </h2>
      )}
    </main>
  );
}

export default App;
