import { useEffect, useState } from "react";
import "./App.css";
import { Today } from "./components/Today";
import { OpenMeteoApi } from "./libs/open-meteo-api";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const omApi = new OpenMeteoApi(-10.7172, -38.5431);
      await omApi.fetchWeather();
      setData(omApi.getCurrentData());
    }

    fetchData();

  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) {
    return <span className="text-lg text-Neutral-0">Loading...</span>;
  }

  return (
    <div className="m-auto w-80">
      <Today
        variant={"small"}
        temperature={Math.floor(data.temperature_2m)}
        date={data.date}
        city={"Brazil, Fortaleza"}
        weatherIcon={"/assets/images/icon-sunny.webp"}
      />
    </div>
  );
}

export default App;
