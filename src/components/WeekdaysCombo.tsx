import { useEffect, useState } from "react";
import type { WeekDay } from "../types/types";

type WeekdaysComboProps = {
  onchange: (weekdays: string) => void;
};

type WeekdaysItemProps = {
  weekday: WeekDay;
  onclick: () => void;
};

export const WeekdaySelected = (props: WeekdaysItemProps) => {
  const [selected, setSelected] = useState(props.weekday);

  useEffect(() => {
    setSelected(props.weekday);
  }, [props.weekday]);

  return (
    <button
      className="flex items-center justify-center gap-2 bg-Neutral-600 font-dmSans text-sm text-Neutral-0 p-2 w-full cursor-pointer rounded-xl"
      onClick={props.onclick}
    >
      {selected.label}
      <img src="/assets/images/icon-dropdown.svg" alt="Dropdown button" />
    </button>
  );
};

export const WeekdayItem = (props: WeekdaysItemProps) => {
  const [selected, setSelected] = useState(props.weekday);

  useEffect(() => {
    setSelected(props.weekday);
  }, [props.weekday]);

  return (
    <button
      className="flex items-center justify-start gap-2 bg-Neutral-800 hover:bg-Neutral-600 font-dmSans text-sm text-Neutral-0 p-2 w-full cursor-pointer rounded-xl"
      onClick={props.onclick}
    >
      {selected.label}
    </button>
  );
};

export const WeekdaysList = () => {
  const completeList: WeekDay[] = [
    { value: 0, label: "Monday" },
    { value: 1, label: "Tuesday" },
    { value: 2, label: "Wednesday" },
    { value: 3, label: "Thursday" },
    { value: 4, label: "Friday" },
    { value: 5, label: "Saturday" },
    { value: 6, label: "Sunday" },
  ];

  return (
    <div className="flex flex-col gap-2 border border-neutral-700 rounded-xl p-2 bg-Neutral-800 w-64">
        {completeList.map((weekday) => (
          <WeekdayItem key={weekday.value} weekday={weekday} onclick={() => console.log(weekday.label)} />
        ))}
    </div>
  );
};

export const WeekdaysCombo = (props: WeekdaysComboProps) => {
  const [isOpen, setIsOpen] = useState(false);
  //   const [selectedWeekday, setSelectedWeekday] = useState(0);
  const completeList: WeekDay[] = [
    { value: 0, label: "Monday" },
    { value: 1, label: "Tuesday" },
    { value: 2, label: "Wednesday" },
    { value: 3, label: "Thursday" },
    { value: 4, label: "Friday" },
    { value: 5, label: "Saturday" },
    { value: 6, label: "Sunday" },
  ];
  const [weekdays, setWeekdays] = useState<WeekDay[]>([completeList[0]]);

  //   const weekdays: Record<number, string> = {
  //     0: "Monday",
  //     1: "Tuesday",
  //     2: "Wednesday",
  //     3: "Thursday",
  //     4: "Friday",
  //     5: "Saturday",
  //     6: "Sunday",
  //   };

  //   const handleWeekdayChange = (weekdays: string) => {
  //     const selectedKey = Object.keys(weekdays).find(
  //       (key) => weekdays[Number(key)] === weekdays
  //     );
  //     setSelectedWeekday(Number(selectedKey));
  //     props.onchange(weekdays);
  //     setIsOpen(false);
  // }

  //   if (!isOpen) {
  //     return (
  //         <div>
  //             <button onClick={() => setIsOpen(true)}>
  //                 {weekdays[selectedWeekday]}
  //             </button>
  //         </div>
  //     );
  //   }

  return (
    <ul>
      {Object.entries(weekdays).map(([key, value]) => (
        <li key={key}>
          <WeekdaySelected weekday={value} onclick={() => console.log(value)} />
        </li>
      ))}
    </ul>
    // <div
    //   id="weekdays"
    // >
    //   <option value="Mon">Monday</option>
    //   <option value="Tue">Tuesday</option>
    //   <option value="Wed">Wednesday</option>
    //   <option value="Thu">Thursday</option>
    //   <option value="Fri">Friday</option>
    //   <option value="Sat">Saturday</option>
    //   <option value="Sun">Sunday</option>
    // </div>
  );
};
