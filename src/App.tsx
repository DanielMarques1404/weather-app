import { useEffect, useState } from "react";
import "./App.css";
import { DailyForecast } from "./components/DailyForecast";
import { QuickInfo } from "./components/QuickInfo";
import { Today } from "./components/Today";
import { OpenMeteoApi } from "./libs/open-meteo-api";
import { getOpenMeteoIconName } from "./libs/utils";
import type { CurrentData, DailyData, HourlyData } from "./types/types";

function App() {
  const [currentData, setCurrentData] = useState<CurrentData | null>(null);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const omApi = new OpenMeteoApi(-3.7172, -38.5431);
      await omApi.fetchWeather();
      setCurrentData(omApi.getCurrentData());
      setDailyData(omApi.getDailyData());
      setHourlyData(omApi.getHourlyData());
    };

    fetchData();
  }, []);

  if (!currentData || !dailyData || !hourlyData) {
    return <span className="text-lg text-Neutral-0">Loading...</span>;
  }
  console.log({ currentData, dailyData, hourlyData });


  return (
    <main className="flex flex-col gap-4 m-auto w-92">
      <Today
        variant={"small"}
        temperature={Math.floor(currentData.temperature_2m)}
        date={currentData.date}
        city={"Brazil, Fortaleza"}
        weatherIcon={`/assets/images/icon-${getOpenMeteoIconName(currentData.weather_code)}.webp`}
      />

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

      <section >
        <span className="flex items-center justify-start text-Neutral-0 font-dmSans my-2">Daily Forecast</span>
        <ul className="grid grid-cols-3 gap-3">
          {dailyData.time
            .filter(time => time >= currentData.date)
            .slice(0, 7)
            .map((time, idx) => (
              <li key={idx}>
                <DailyForecast
                  weekday={time.toLocaleDateString("en-us", {
                    weekday: "short",
                  })}
                  icon={`/assets/images/icon-${getOpenMeteoIconName(dailyData.weather_code[idx])}.webp`}
                  minTemperature={Math.floor(dailyData.temperature_2m_min[idx])}
                  maxTemperature={Math.floor(dailyData.temperature_2m_max[idx])}
                />
              </li>
            ))}
        </ul>
      </section>

      {/* <section><HourlyForecast hourlyData={hourlyData.hourly} /></section> */}
    </main>
  );
}

export default App;
