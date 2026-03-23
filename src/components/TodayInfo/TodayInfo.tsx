import type { City, CurrentData } from "../../types/types";
import { MainCard } from "./MainCard";
import { SimpleCard } from "./SimpleCard";

type TodayInfoProps = {
  data: CurrentData | undefined;
  city: City | null;
  isLoading: boolean;
};

export const TodayInfo = ({ data, city, isLoading }: TodayInfoProps) => {
  return (
    <section className="flex flex-col gap-3">
      <section>
        <MainCard
          data={data}
          city={city}
          isLoading={isLoading}
        />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SimpleCard
          label={"Feels like"}
          info={data?.apparent_temperature}
          kind="temperature"
          isLoading={isLoading}
        />
        <SimpleCard
          label={"Humidity"}
          info={data?.relative_humidity_2m}
          kind="humidity"
          isLoading={isLoading}
        />
        <SimpleCard
          label={"Wind"}
          info={data?.wind_speed_10m}
          kind="windSpeed"
          isLoading={isLoading}
        />
        <SimpleCard
          label={"Precipitation"}
          info={data?.precipitation}
          kind="precipitation"
          isLoading={isLoading}
        />
      </section>
    </section>
  );
};
