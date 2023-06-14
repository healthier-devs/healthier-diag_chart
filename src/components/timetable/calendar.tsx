import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TimeTableCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <Calendar
      value={selectedDate}
      onClickDay={setSelectedDate}
      calendarType="US"
      locale="ko-KR"
      minDetail="month"
      formatDay={(locale, date) =>
        date.toLocaleString("en", { day: "numeric" })
      }
      next2Label={null}
      prev2Label={null}
      nextLabel=">"
      prevLabel="<"
      tileClassName={({ date, view }) => {
        let returnVal = "";
        if (view === "month") {
          if (date.getDay() === 0) {
            returnVal += "sunday";
          } else if (date.getDay() === 6) {
            returnVal += "saturday";
          }
          if (moment(date).week() === moment(selectedDate).week()) {
            returnVal += " selected";
          }
          return returnVal;
        }
      }}
    />
  );
};

export default TimeTableCalendar;
