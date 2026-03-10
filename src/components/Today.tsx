import { cn } from "../libs/cn";
import { dateOptions } from "../libs/utils";

type TodayProps = {
  variant: "small" | "large";
  temperature: number;
  date: Date;
  city: string;
  weatherIcon: string;
};

export const Today = (props: TodayProps) => {
  return (
    <div className="relative grid font-dmSans rounded-2xl overflow-hidden">
      <img
        src="/assets/images/bg-today-small.svg"
        alt="Today image"
        className={cn(
          "col-start-1 -col-end-1 row-start-1 -row-end-1 object-cover w-full h-full z-0",
          { hidden: props.variant === "large" },
        )}
      />

      <img
        src="/assets/images/bg-today-large.svg"
        alt="Today image"
        className={cn(
          "col-start-1 -col-end-1 row-start-1 -row-end-1 object-cover w-full h-full z-0",
          { hidden: props.variant === "small" },
        )}
      />

      <div className="col-start-1 -col-end-1 row-start-1 -row-end-1 z-10 flex items-center justify-center">
        <div className="grid grid-rows-2 items-center justify-center">
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-semibold text-Neutral-200">{props.city}</span>
            <span className="text-xl text-Neutral-300">{props.date.toLocaleDateString('en-us', dateOptions)}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <img className="w-28 h-28" src={props.weatherIcon} alt="Icon weather" />
            <span className="text-8xl font-bold italic text-Neutral-0">{props.temperature}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};
