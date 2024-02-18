"use client";

import React, { useState } from "react";
import { DayPicker, Row, RowProps } from "react-day-picker";
import { endOfWeek, isWithinInterval, startOfWeek, format } from "date-fns";
import { Plus } from "react-feather";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import "react-day-picker/dist/style.css";
import { Fab } from "@mui/material";
// import makeStyles from '@mui/styles/makeStyles';
import Link from "next/link";
// import { makeStyles } from '@mui/styles';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const classes = makeStyles({
  //   addButton: {
  //     color: "primary",
  //     backgroundColor: "red",
  //     "&:hover": {
  //     backgroundColor: "yellow"
  //   }
  //   },
  // });
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
          <Fab
            id="basic-button"
            className="bg-sky-400 hover:bg-sky-500"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            // sx={{ backgroundColor: "blue", color: "primary" }}
          >
            <Plus />
          </Fab>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link href="/add/single">Single Assignment</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/add/calendar">Calendar Link</Link></MenuItem>
            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
{/*           
          <button className="btn btn-primary btn-circle">
            <Plus />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
