import TimeTableCalendar from "./calendar";

const TimeTable = () => {
  return (
    // [TEMP]: h-2/3 for temporary, need to change to h-full
    <div className="w-[300px] h-full bg-white mr-8 rounded-2xl p-4 flex flex-col justify-start items-center">
      <TimeTableCalendar />
    </div>
  );
};

export default TimeTable;
