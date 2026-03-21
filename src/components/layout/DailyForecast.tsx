import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useUnitContext } from "../../app/hooks/useUnitContext";
import {
  getOpenMeteoIconName,
  getWeatherFor,
  type WeatherResult,
} from "../../libs/utils";
import type { City } from "../../types/types";
import { DailyForecastCards } from "../DailyForecastCard";
import { HourlyForecast } from "../HourlyForecast";
import { QuickInfo } from "../QuickInfo";
import { Today } from "../Today";

type DailyForestProps = {
  city: City | null;
};

export const DailyForecast = ({ city }: DailyForestProps) => {
  const { unit } = useUnitContext();
  const [selectedCity, setSelectedCity] = useState<City | null>(city);

  useEffect(() => {
    setSelectedCity(city);
  }, [city]);


  const { data, isLoading } = useQuery<WeatherResult>({
    queryKey: ["weather", selectedCity?.id, unit],
    queryFn: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (selectedCity) {
            resolve(getWeatherFor(selectedCity, unit));
          } else {
            reject(new Error("Cidade não selecionada"));
          }
        }, 1500); 
      }),
    enabled: !!selectedCity,
  });

  // const { currentData, dailyData, hourlyData } = data ?? {};

  // if (isLoading) {
  //   return <div className="text-Neutral-0">Carregando previsão...</div>;
  // }

  // if (isError || !currentData || !dailyData || !hourlyData) {
  //   return <div>Erro ao carregar previsão do tempo.</div>;
  // }

  return (
    <section className="flex flex-col gap-3">
      <section>
        <Today
          variant={"small"}
          temperature={Math.floor(data?.currentData.temperature_2m ?? 0)}
          date={data?.currentData.date}
          city={`${selectedCity?.name}, ${selectedCity?.country}`}
          weatherIcon={`/assets/images/icon-${getOpenMeteoIconName(data?.currentData.weather_code ?? 0)}.webp`}
          isLoading={isLoading}
        />
      </section>

      <section className="grid grid-cols-2 grid-rows-2 gap-4">
        <QuickInfo
          label={"Feels like"}
          info={data?.currentData.apparent_temperature}
          kind="temperature"
        />
        <QuickInfo
          label={"Humidity"}
          info={data?.currentData.relative_humidity_2m}
          kind="humidity"
        />
        <QuickInfo
          label={"Wind"}
          info={data?.currentData.wind_speed_10m}
          kind="windSpeed"
        />
        <QuickInfo
          label={"Precipitation"}
          info={data?.currentData.precipitation}
          kind="precipitation"
        />
      </section>
 
      <section>
        <span className="flex items-center justify-start text-Neutral-0 font-dmSans font-bold my-2">
          Daily Forecast
        </span>
        <DailyForecastCards data={data}/>
      </section>
      
      <section>
        <HourlyForecast hourly={data?.hourlyData} />
      </section>
    </section>
  );
};
