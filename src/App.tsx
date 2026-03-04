import { useEffect, useState } from "react";
import "./App.css";
import { QuickInfo } from "./components/QuickInfo";
import { Today } from "./components/Today";
import { OpenMeteoApi } from "./libs/open-meteo-api";
import { getOpenMeteoIconName } from "./libs/utils";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const omApi = new OpenMeteoApi(-3.7172, -38.5431);
      await omApi.fetchWeather();
      setData(omApi.getCurrentData());
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) {
    return <span className="text-lg text-Neutral-0">Loading...</span>;
  }

  return (
    <div className="m-auto w-80 space-y-2">
      <Today
        variant={"small"}
        temperature={Math.floor(data.temperature_2m)}
        date={data.date}
        city={"Brazil, Fortaleza"}
        weatherIcon={`/assets/images/icon-${getOpenMeteoIconName(data.weather_code)}.webp`}
      />
      <section className="grid grid-cols-2 grid-rows-2 gap-2">
        <QuickInfo
          label={"Feels like"}
          info={`${Math.floor(data.apparent_temperature)}°`}
        />
        <QuickInfo
          label={"Humidity"}
          info={`${Math.floor(data.relative_humidity_2m)}%`}
        />
        <QuickInfo
          label={"Wind"}
          info={`${Math.floor(data.wind_speed_10m)} km/h`}
        />
        <QuickInfo
          label={"Precipitation"}
          info={`${Math.floor(data.precipitation)} mm`}
        />
      </section>
    </div>
  );
}

export default App;
