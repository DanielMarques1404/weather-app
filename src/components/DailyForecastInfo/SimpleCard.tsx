import { getOpenMeteoIconName } from "../../libs/utils";
import type { DailyData } from "../../types/types";

type SimpleCardProps = {
  data: DailyData | undefined;
  weekday: string;
  index: number;
  isLoading?: boolean;
};

export const SimpleCard = (props: SimpleCardProps) => {
  if (props.isLoading)
    return (
      <div className="rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 h-40"></div>
    );

  return (
    <div className="flex flex-col gap-2 items-center justify-around rounded-xl border border-Neutral-600 bg-Neutral-800 p-2 h-40">
      <span className="font-dmSans text-md text-Neutral-200 mb-2">
        {props.weekday}
      </span>
      <img
        className="w-16 h-16"
        src={`/assets/images/icon-${getOpenMeteoIconName(props.data!.weather_code[props.index])}.webp`}
        alt="Weather Icon"
      />
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-md text-Neutral-200">
          {Math.floor(props.data!.temperature_2m_min[props.index])}°
        </span>
        <span className="text-md text-Neutral-300">
          {Math.floor(props.data!.temperature_2m_max[props.index])}°
        </span>
      </div>
    </div>
  );
};

