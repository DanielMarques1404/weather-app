import { dateOptions, getOpenMeteoIconName } from "../../libs/utils";
import type { City, CurrentData } from "../../types/types";

type MainCardProps = {
  data: CurrentData | undefined;
  city: City | null;
  isLoading: boolean;
};

export const MainCard = (props: MainCardProps) => {
  if (props.isLoading)
    return (
      <div className="flex flex-col items-center justify-center text-Neutral-0 w-full h-full bg-Neutral-700 rounded-2xl border border-Neutral-600">
        <img src="/assets/images/icon-loading.svg" className="w-12 h-12" />
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-center font-dmSans rounded-2xl overflow-hidden p-4 bg-[url('/assets/images/bg-today-small.svg')] md:bg-[url('/assets/images/bg-today-large.svg')] bg-cover bg-center">
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-semibold text-Neutral-200">
          {`${props.city!.name}, ${props.city!.country}`}
        </span>
        <span className="text-xl text-Neutral-300">
          {props.data!.date?.toLocaleDateString("en-us", dateOptions)}
        </span>
      </div>
      <div className="flex gap-8 w-full items-center justify-center">
        <img
          className="w-28 h-28"
          src={`/assets/images/icon-${getOpenMeteoIconName(props.data!.weather_code)}.webp`}
          alt="Icon weather"
        />
        <span className="text-8xl font-bold italic text-Neutral-0">
          {Math.floor(props.data!.temperature_2m)}°
        </span>
      </div>
    </div>
  );
};
