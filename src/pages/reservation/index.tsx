import { SIDEBAR_WIDTH } from "@/assets/constants";
import TimeTable from "@/components/timetable";

const ReservationPage = () => {
  return (
    <div className={`w-[calc(100vw-${SIDEBAR_WIDTH}) h-[100vh] bg-red-200`}>
      {/* [TEMP]: items and justify for temporary, change needed */}
      <div className="w-full h-full relative flex justify-end items-center">
        <TimeTable />
      </div>
    </div>
  );
};

export default ReservationPage;
