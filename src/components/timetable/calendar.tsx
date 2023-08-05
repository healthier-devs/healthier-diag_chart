import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface ICalendarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const TimeTableCalendar = ({ date, setDate }: ICalendarProps) => {
  return (
    <Calendar
      value={date}
      onClickDay={(date) => {
        setDate(date);
      }}
      calendarType="US"
      locale="en-US"
      minDetail="month"
      formatDay={(locale, date) =>
        date.toLocaleString("en", { day: "numeric" })
      }
      navigationLabel={({ date, view }) => {
        return moment(date).format("YYYY년 MM월");
        // return moment(date).format("YYYY.MM");
      }}
      next2Label={null}
      prev2Label={null}
      nextLabel={
        <div className="flex items-center justify-center w-full h-full ">
          <FiChevronRight />
        </div>
      }
      prevLabel={
        <div className="flex items-center justify-center w-full h-full">
          <FiChevronLeft />
        </div>
      }
      showNeighboringMonth={false}
      tileClassName={({ date, view }) => {
        let returnVal = "";
        if (view === "month") {
          if (date.getDay() === 0) {
            returnVal += "sunday";
          } else if (date.getDay() === 6) {
            returnVal += "saturday";
          }
          return returnVal;
        }
      }}
    />
  );
};

export default TimeTableCalendar;
