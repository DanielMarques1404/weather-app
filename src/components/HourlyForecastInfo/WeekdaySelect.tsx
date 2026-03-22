import { useState, useEffect } from "react";

type WeekdaySelectProps = {
  label?: string | undefined;
  isLoading: boolean;
  onclick: () => void;
};

export const WeekdaySelect = ({
  label,
  isLoading,
  onclick,
}: WeekdaySelectProps) => {

  const [selected, setSelected] = useState(label);

  useEffect(() => {
    setSelected(label);
  }, [label]);

  return (
    <div
      className="flex items-center justify-center gap-2 bg-Neutral-600 font-dmSans text-sm text-Neutral-0 p-2 w-full cursor-pointer rounded-xl"
      onClick={onclick}
    >
      {isLoading ? "-" : selected}
      <img src="/assets/images/icon-dropdown.svg" alt="Dropdown button" />
    </div>
  );
};
