type DailyForecastProps = {
  weekday: string;
  icon: string;
  minTemperature: number;
  maxTemperature: number;
};

export const DailyForecast = (props: DailyForecastProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-around rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 h-40">
      <span className="font-dmSans text-md text-Neutral-200 mb-2">{props.weekday}</span>
      <img className="w-16 h-16" src={props.icon} alt="Weather Icon" />
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-md text-Neutral-200">{props.minTemperature}°</span>
        <span className="text-md text-Neutral-300">{props.maxTemperature}°</span>
      </div>
    </div>
  );
};
