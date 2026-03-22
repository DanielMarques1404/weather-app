import { getOpenMeteoIconName } from "../../libs/utils";
import type { HourlyData } from "../../types/types";

type ItemListProps = {
  data: HourlyData | undefined;
  index: number;
  day: number;
  isLoading: boolean;
};

export const Item = (props: ItemListProps) => {
  if (props.isLoading)
    return (
      <div className="flex items-center justify-between p-2 w-full border border-Neutral-600 bg-Neutral-700 rounded-md h-12"></div>
    );

  return (
    <div className="flex items-center justify-between p-2 w-full border border-Neutral-600 bg-Neutral-700 rounded-md">
      <div className="flex items-center justify-center gap-1">
        <img
          src={`/assets/images/icon-${getOpenMeteoIconName(props.data!.weather_code[props.day][props.index])}.webp`}
          alt="Weather icon"
          className="w-8 h-8"
        />
        <span className="font-dmSans text-md text-Neutral-200">
          {props.data!.time[props.day][props.index].toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          })}
        </span>
      </div>

      <span className="font-dmSans text-sm text-Neutral-200">
        {Math.floor(props.data!.temperature_2m[props.day][props.index])}°
      </span>
    </div>
  );
};
