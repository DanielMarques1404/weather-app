type ItemListProps = {
  weatherIcon: string;
  hour: string;
  temperature: number;
};

export const ItemList = (props: ItemListProps) => {
  return (
    <div className="flex items-center justify-between p-2 w-full border border-Neutral-600 bg-Neutral-700 rounded-md">
      <div className="flex items-center justify-center gap-1">
        <img src={props.weatherIcon} alt="Weather icon" className="w-8 h-8" />
        <span className="font-dmSans text-md text-Neutral-200">
          {props.hour}
        </span>
      </div>

      <span className="font-dmSans text-sm text-Neutral-200">
        {props.temperature}°
      </span>
    </div>
  );
};
