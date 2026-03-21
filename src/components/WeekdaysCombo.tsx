import { useEffect, useState } from "react";
import type { WeekDay } from "../types/types";

type WeekdayItemProps = {
  weekday: WeekDay;
  onclick: (index: number) => void;
};

type WeekdaySelectedProps = {
    label?: string;
    onclick: () => void;
}

type WeekdaysListProps = {
    indexList: number[];
    onclick: (weekDayIndex: number) => void;
}

export const WeekdaySelected = ({label, onclick}: WeekdaySelectedProps) => {
  const [selected, setSelected] = useState(label);

  useEffect(() => {
    setSelected(label);
  }, [label]);

  return (
    <div
      className="flex items-center justify-center gap-2 bg-Neutral-600 font-dmSans text-sm text-Neutral-0 p-2 w-full cursor-pointer rounded-xl"
      onClick={onclick}
    >
      {selected ? selected : "-"}
      <img src="/assets/images/icon-dropdown.svg" alt="Dropdown button" />
    </div>
  );
};

export const WeekdayItem = (props: WeekdayItemProps) => {
  const [selected, setSelected] = useState(props.weekday);

  useEffect(() => {
    setSelected(props.weekday);
  }, [props.weekday]);

  return (
    <div
      className="flex items-center justify-start gap-2 bg-Neutral-800 hover:bg-Neutral-600 font-dmSans text-sm text-Neutral-0 p-2 w-full cursor-pointer rounded-xl"
      onClick={() => props.onclick(selected.value)}
    >
      {selected.label}
    </div>
  );
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
        {completeList.map((weekday) => (
          <WeekdayItem key={weekday.value} weekday={weekday} onclick={() => onclick(weekday.value)} />
        ))}
    </div>
  );
};
