"use client";

import Link from 'next/link'
import React, { useState } from "react";
import { DayPicker, Row, RowProps } from "react-day-picker";
import { endOfWeek, isWithinInterval, startOfWeek, format } from "date-fns";
import * as Icon from "react-feather";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";

function CurrentWeekRow(props: RowProps) {
  const isDateInCurrentWeek = (dateToCheck: Date) => {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);
    return isWithinInterval(dateToCheck, { start, end });
  };
  const isNotCurrentWeek = props.dates.every(
    (date: any) => !isDateInCurrentWeek(date)
  );
  if (isNotCurrentWeek) return <></>;
  return <Row {...props} />;
}

const Dashboard = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [selected, setSelected] = useState<Date>(new Date());

  let footer = <p>Please pick a day</p>;
  if (selected) {
    footer = (
      <p>
        You picked{" "}
        <span className="text-primary font-semibold">
          {format(selected, "PP")}
        </span>
      </p>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
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
          <div className="dropdown dropdown-hover">
            <button className="btn btn-primary btn-circle">
              <Icon.Plus />
            </button>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
              <li>
                <Link href="/add/calender">Calender</Link>
                {/* <a href="">
                  <h1
                    className=""
                    // onClick={() =>
                    //   document.getElementById("my_modal_1").showModal()
                    // }
                  >
                    Calender
                  </h1> */
                /* </a> */}
              </li>
              <li>
                {/* <a
                  onClick={() =>
                    document.getElementById("task_modal")?.showModal()
                  }
                >
                  Task
                </a> */}
                  <Link href="/add/single">Task</Link>
              </li>

              <dialog id="task_modal" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">New Task.</h3>

                  <form
                    onSubmit={handleSubmit((data) =>
                      setData(JSON.stringify(data))
                    )}
                    className="flex flex-col items-start space-y-2 mt-6"
                  >
                    <input
                      type="text"
                      placeholder="Name..."
                      className="input input-bordered w-full max-w-xs"
                      {...register("name")}
                    />
                    <input
                      type="text"
                      placeholder="Description..."
                      className="input input-bordered w-full max-w-xs"
                      {...register("description")}
                    />
                    <input
                      type="text"
                      placeholder="Subject (sport, math)..."
                      className="input input-bordered w-full max-w-xs"
                      {...register("description")}
                    />
                    <div className="flex flex-col w-full space-y-1">
                      <h1 className="font-semibold">Start time:</h1>
                      <input
                        type="time"
                        className="input input-bordered w-full max-w-xs"
                        {...register("startTime")}
                      />
                    </div>
                    <div className="flex flex-col w-full space-y-1">
                      <h1 className="font-semibold">End time:</h1>
                      <input
                        type="time"
                        className="input input-bordered w-full max-w-xs"
                        {...register("endTime")}
                      />
                    </div>
                    <button onSubmit={() => {}} className="btn-primary btn">
                      Submit
                    </button>
                  </form>
                </div>
              </dialog>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
