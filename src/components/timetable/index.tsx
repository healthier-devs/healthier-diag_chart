import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import Datepicker from "react-datepicker";
import ReservationList from "@/components/timetable/reservationList";
import TimeTableCalendar from "./calendar";
import moment from "moment";
import { DoW } from "@/assets/constants";
import { HiOutlineCalendar } from "react-icons/hi";
import Pagination from "@/components/Pagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

interface IPLProps {
  tmp?: number;
}

const TimeTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpenState, setModalOpenState] = useState(false);

  const handleTimeModal = () => {
    console.log("handleTimeModal");
    setModalOpenState(true);
  };

  const PatientList = ({ tmp }: IPLProps) => {
    return (
      <tr className="w-full h-10 text-[12px]">
        <td className="h-full font-normal px-2.5 text-left">정설아</td>
        <td className="h-full font-normal px-2.5 text-left">
          {moment(new Date()).format("YYYY.MM.DD")}
        </td>
        <td className="h-full font-normal px-2.5 text-left">여</td>
        <td className="h-full font-normal px-2.5 text-left">010-1234-5678</td>
        <td className="h-full font-normal pl-2.5 pr-2 text-left">
          {tmp === 1 ? (
            <>
              08/28 (토) 14:30
              <button
                className="ml-2 h-6 bg-app_blue_500 text-white px-2 rounded-md text-[10px]"
                onClick={() => handleTimeModal()}
              >
                수정
              </button>
            </>
          ) : tmp === 2 ? (
            <button className="h-6 bg-app_blue_500 text-white px-2 rounded-md text-[10px]">
              예약 시간 지정
            </button>
          ) : (
            "미지정"
          )}
        </td>
        <td className="h-full font-normal px-2.5 text-left">이비인후과</td>
        <td className="h-full font-normal px-2.5 text-left">원장님 1</td>
      </tr>
    );
  };

  const WaitingList = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    return (
      <div className="w-full h-full bg-white rounded-xl p-3">
        <div className="w-full ml-2 font-semibold text-sm mb-3 text-[#787C83]">
          {moment(new Date()).format("yyyy년 M월 D일 ") +
            DoW[moment(new Date()).day()] +
            "요일"}
        </div>
        <div className="w-full h-12 flex flex-row items-center px-4 justify-between bg-app_gray_100 rounded-t-md">
          {/* filter area */}
          <div className="flex flex-row gap-2 text-center">
            <div className="flex flex-row justify-center items-center">
              <Datepicker
                className="w-20 h-6 text-[11px] text-center px-2 rounded border-[#C5C8CE] border bg-[#F8F8F8] mr-1"
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                dateFormat="yyyy-MM-dd"
              />
              <HiOutlineCalendar
                size={20}
                stroke={"#787C83"}
                strokeWidth={1.5}
              />
            </div>
            <div className="text-[#999DA4]">-</div>
            <div className="flex flex-row justify-center items-center">
              <Datepicker
                className="w-20 h-6 text-[11px] text-center px-2 rounded border-[#C5C8CE] border bg-[#F8F8F8] mr-1"
                selected={endDate}
                onChange={(date) => setEndDate(date!)}
                dateFormat="yyyy-MM-dd"
                endDate={startDate}
              />
              <HiOutlineCalendar
                size={20}
                stroke={"#787C83"}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
        <table className="w-full">
          <colgroup>
            <col width="10%" />
            <col width="14%" />
            <col width="7%" />
            <col width="17%" />
            <col width="24%" />
            <col width="13%" />
            <col width="14%" />
          </colgroup>
          <thead className="w-full h-9 border-app_stroke_gray_300 border-y-[1px]">
            <tr className="w-full text-[12px]">
              <th className="h-full font-normal px-2.5 text-left">이름</th>
              <th className="h-full font-normal px-2.5 text-left">생년월일</th>
              <th className="h-full font-normal px-2.5 text-left">성별</th>
              <th className="h-full font-normal px-2.5 text-left">전화번호</th>
              <th className="h-full font-normal px-2.5 text-left">예약 시간</th>
              <th className="h-full font-normal px-2.5 text-left">진료과목</th>
              <th className="h-full font-normal px-2.5 text-left">주치의</th>
            </tr>
          </thead>
        </table>
        <table className="block w-full h-[360px] overflow-y-auto">
          <colgroup>
            <col width="10%" />
            <col width="14%" />
            <col width="7%" />
            <col width="17%" />
            <col width="24%" />
            <col width="13%" />
            <col width="14%" />
          </colgroup>
          <tbody>
            <PatientList tmp={1} />
            <PatientList />
            <PatientList tmp={2} />
            <PatientList />
            <PatientList />
            <PatientList tmp={3} />
            <PatientList />
            <PatientList />
            <PatientList />
            <PatientList />
            <PatientList />
            <PatientList />
          </tbody>
        </table>
        {/* <Pagination
          index={1}
          endPage={5}
        /> */}
      </div>
    );
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "53%",
    height: "56%",
    bgcolor: "background.paper",
    borderRadius: "24px",
    padding: 5,
  };

  return (
    <div className="w-full h-full bg-app_healthier_bg flex flex-col px-10 pb-8">
      <Modal
        open={modalOpenState}
        onClose={() => setModalOpenState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>Text in a modal</div>
        </Box>
      </Modal>
      <div className="w-full mt-[3.75rem] mb-10 font-bold text-xl">
        대시 보드
      </div>
      <div className="w-full flex flex-row font-bold mb-3 text-base">
        <div className="w-full">예약 요청</div>
        <div className="basis-[440px] flex justify-start">예약 현황</div>
      </div>

      <div className="w-full h-full flex flex-row gap-4">
        <WaitingList />
        <div className="w-[300px] h-full bg-white rounded-2xl p-4 flex gap-3 flex-col justify-start items-center">
          <TimeTableCalendar
            date={selectedDate}
            setDate={setSelectedDate}
          />
          <ReservationList date={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
