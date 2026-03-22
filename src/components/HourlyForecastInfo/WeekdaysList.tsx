import type { WeekDay } from "../../types/types";

type WeekdaysListProps = {
  indexList: number[];
  onclick: (weekDayIndex: number) => void;
};

export const WeekdaysList = ({ indexList, onclick }: WeekdaysListProps) => {
  const completeList: WeekDay[] = [
    { value: indexList[0], label: "Monday" },
    { value: indexList[1], label: "Tuesday" },
    { value: indexList[2], label: "Wednesday" },
    { value: indexList[3], label: "Thursday" },
    { value: indexList[4], label: "Friday" },
    { value: indexList[5], label: "Saturday" },
    { value: indexList[6], label: "Sunday" },
  ];

  return (
    <div className="flex flex-col gap-2 border border-Neutral-600 rounded-xl p-2 bg-Neutral-800 w-64">
      {completeList.map((weekday, idx) => (
        <div
          key={`weekday-${idx}`}
          className="flex items-center justify-start gap-2 bg-Neutral-800 hover:bg-Neutral-600 font-dmSans text-sm text-Neutral-0 p-2 w-full cursor-pointer rounded-xl"
          onClick={() => onclick(weekday.value)}
        >
          {weekday.label}
        </div>
      ))}
    </div>
  );
};
