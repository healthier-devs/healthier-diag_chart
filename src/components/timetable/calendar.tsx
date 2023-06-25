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
      onClickDay={setDate}
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
        <div className="w-full h-full flex justify-center items-center ">
          <FiChevronRight />
        </div>
      }
      prevLabel={
        <div className="w-full h-full flex justify-center items-center">
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
