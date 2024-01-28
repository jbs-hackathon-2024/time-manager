"use client";

import React, { useState } from "react";
import { DayPicker, Row, RowProps } from "react-day-picker";
import { endOfWeek, isWithinInterval, startOfWeek, format } from "date-fns";
import { Plus } from "react-feather";
import "react-day-picker/dist/style.css";

function CurrentWeekRow(props: RowProps) {
  const isDateInCurrentWeek = (dateToCheck: Date) => {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);
    return isWithinInterval(dateToCheck, { start, end });
  };
  const isNotCurrentWeek = props.dates.every(
    (date) => !isDateInCurrentWeek(date)
  );
  if (isNotCurrentWeek) return <></>;
  return <Row {...props} />;
}

const Dashboard = () => {
  const [selected, setSelected] = useState<Date>(new Date());

  let footer = <p>Please pick a day</p>;
  if (selected) {
    footer = <p>You picked <span className="text-primary font-semibold">{format(selected, "PP")}</span></p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center"></div>

      <div className="flex flex-col">
        <h1 className="text-5xl font-bold">Welcome STUDENT!</h1>
        <div className="mt-4 flex space-x-4">
          <DayPicker
            disableNavigation
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={<div className="mt-4 text-xs">{footer}</div>}
            components={{ Row: CurrentWeekRow }}
            showOutsideDays
          />
          <button className="btn btn-primary btn-circle">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
