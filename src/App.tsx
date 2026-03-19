import { useEffect, useState } from "react";
import "./App.css";
import { useUnitContext } from "./app/hooks/useUnitContext";
import { DailyForecast } from "./components/DailyForecast";
import { HourlyForecast } from "./components/HourlyForecast";
import { QuickInfo } from "./components/QuickInfo";
import { Today } from "./components/Today";
import { OpenMeteoApi } from "./libs/open-meteo-api";
import { getOpenMeteoIconName } from "./libs/utils";
import type { City, CurrentData, DailyData, HourlyData } from "./types/types";
import { Header } from "./components/layout/Header";

function App() {
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const { unit } = useUnitContext();

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;
      const omApi = new OpenMeteoApi(city.latitude, city.longitude, unit);
      await omApi.fetchWeather();
      setCurrentData(omApi.getCurrentData());
      setDailyData(omApi.getDailyData());
      setHourlyData(omApi.getHourlyData());
    };

    fetchData();
  }, [city, unit]);

  return (
    <main className="flex flex-col gap-4 w-88 md:w-full m-auto">
      <Header setCity={setCity}/>

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
              info={`${Math.floor(currentData.wind_speed_10m)} ${unit.windSpeed}`}
            />
            <QuickInfo
              label={"Precipitation"}
              info={`${Math.floor(currentData.precipitation)} ${unit.precipitation_short}`}
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
