import { getOpenMeteoIconName, type WeatherResult } from "../libs/utils";

type DailyForecastCardProps = {
  weekday: string;
  icon: string;
  minTemperature: number;
  maxTemperature: number;
};

export const DailyForecastCard = (props: DailyForecastCardProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-around rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 h-40">
      <span className="font-dmSans text-md text-Neutral-200 mb-2">
        {props.weekday}
      </span>
      <img className="w-16 h-16" src={props.icon} alt="Weather Icon" />
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-md text-Neutral-200">
          {props.minTemperature}°
        </span>
        <span className="text-md text-Neutral-300">
          {props.maxTemperature}°
        </span>
      </div>
    </div>
  );
};

type DailyForecastCardsProps = {
  data?: WeatherResult;
};

export const DailyForecastCards = ({ data }: DailyForecastCardsProps) => {
  if (!data) return <ul className="grid grid-cols-3 gap-3">
    {[0, 1, 2, 3, 4, 5, 6].map((_, idx) => <li key={idx} className="rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 h-40"></li>)}
  </ul>;

  return (
    <ul className="grid grid-cols-3 gap-3">
      {data?.dailyData.time.map((time, idx) => (
        <li key={idx}>
          <DailyForecastCard
            weekday={time.toLocaleDateString("en-us", {
              weekday: "short",
            })}
            icon={`/assets/images/icon-${getOpenMeteoIconName(data?.dailyData.weather_code[idx])}.webp`}
            minTemperature={Math.floor(data?.dailyData.temperature_2m_min[idx])}
            maxTemperature={Math.floor(data?.dailyData.temperature_2m_max[idx])}
          />
        </li>
      ))}
    </ul>
  );
};
