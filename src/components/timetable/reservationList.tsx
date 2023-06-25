import moment from "moment";
import { DoW } from "@/assets/constants";
import React from "react";
interface IReservationProps {
  date: Date;
}

const ReservationCell = () => (
  <div className="flex flex-row items-center text-[10px]">
    <div className="basis-[20%]">10:00</div>
    <div className="basis-[80%] h-6 py-1 px-2 bg-purple-200 rounded-md">
      정설아님
    </div>
  </div>
);

const ReservationList = ({ date }: IReservationProps) => {
  return (
    <div className="w-full h-full bg-gray-100 p-4 rounded-xl text-[14px]">
      <div className="font-semibold mb-3">
        {moment(date).format("M월 D일 ") + "(" + DoW[moment(date).day()] + ") "}
        예약 현황
      </div>
      <div className="w-full flex flex-col gap-2">
        <ReservationCell />
        <ReservationCell />
      </div>
    </div>
  );
};

export default ReservationList;
