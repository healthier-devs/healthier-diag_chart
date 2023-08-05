import { ReactElement, useEffect, useState } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/layouts/Layout";
import axios from "axios";
import moment from "moment";
import CustomInput from "@/components/Input";
import {
  searchWaitingPatient as searchWait,
  searchCompletePatient as searchComp,
  patientRecoilList,
} from "@/utils/atom";
import { useRecoilState } from "recoil";
import CustomButton from "@/components/Button";
import { getPatientList, patchDiagStatus } from "@/api/patient";
import { useRouter } from "next/router";
import TimeTableCalendar from "@/components/timetable/calendar";
import Image from "next/image";
import iconFoldSrc from "@/assets/images/icon_chevron_fold.svg";
import iconUpSrc from "@/assets/images/icon_chevron_up.svg";

interface IRLProps {
  data: any;
  searchComplete: string;
  setSearchComplete: (value: string) => void;
}

interface PatientDataProps {
  visitRecordId: string;
  patient: {
    name: string;
    birthDate: string;
    gender: string;
    age: number;
  };
  submitTime: string;
  cc: string;
  soapUuid: string;
  status: string;
}

const weekday = ["일", "월", "화", "수", "목", "금", "토"];

const ReservedList = ({
  data,
  searchComplete,
  setSearchComplete,
}: IRLProps) => {
  const thClsName =
    "px-3 font-normal text-app_gray_700 leading-4 text-xs tracking-[-0.24px]";
  const tdClsName = "px-3 text-app_gray_750 leading-5 text-xs font-normal";

  return (
    <div className="flex flex-col items-start justify-start w-full h-full p-4 bg-white full rounded-2xl">
      <div className="w-full mb-3">
        <CustomInput
          key="complete"
          holder="환자 이름을 검색해주세요"
          value={searchComplete}
          onChange={(value) => setSearchComplete(value)}
        />
      </div>
      <table className="w-full">
        <colgroup>
          <col style={{ width: "14.8%" }} />
          <col style={{ width: "28.2%" }} />
          <col style={{ width: "54.9%" }} />
        </colgroup>
        <thead className="text-left h-9 border-app_gray_300 border-y-[0.8px]">
          <tr>
            <th className={`${thClsName}`}>No</th>
            <th className={`${thClsName}`}>이름</th>
            <th className={`${thClsName}`}>생년월일</th>
          </tr>
        </thead>
      </table>
      <div className="w-full h-full overflow-y-auto">
        <table className="w-full">
          <colgroup>
            <col style={{ width: "14.8%" }} />
            <col style={{ width: "28.2%" }} />
            <col style={{ width: "54.9%" }} />
          </colgroup>
          <tbody>
            {searchComplete === ""
              ? data &&
                data
                  .filter((elem: any) => elem.status === "COMPLETED")
                  .map((elem: any, i: number) => {
                    return (
                      <tr key={i} className="w-full h-10">
                        <td className={`${tdClsName}`}>{i + 1}</td>
                        <td className={`${tdClsName}`}>{elem.patient.name}</td>
                        <td className={`${tdClsName}`}>
                          {moment(elem.patient.birthDate).format("YYYY.MM.DD")}
                        </td>
                      </tr>
                    );
                  })
              : data
                  .filter((elem: any) => elem.status === "COMPLETED")
                  .filter((elem: any) =>
                    elem.patient.name.includes(searchComplete)
                  )
                  .map((elem: any, i: number) => {
                    return (
                      <tr key={i} className="w-full h-10">
                        <td className={`${tdClsName}`}>{i + 1}</td>
                        <td className={`${tdClsName}`}>{elem.patient.name}</td>
                        <td className={`${tdClsName}`}>
                          {moment(elem.patient.birthDate).format("YYYY.MM.DD")}
                        </td>
                      </tr>
                    );
                  })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface IPDCProps {
  data: PatientDataProps;
  idx: number;
}

const PatientList: NextPageWithLayout = () => {
  const Router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchWaiting, setSearchWaiting] = useRecoilState(searchWait);
  const [searchComplete, setSearchComplete] = useRecoilState(searchComp);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  // const [patientList, setPatientList] = useState<PatientDataProps[]>([]);
  const [patientList, setPatientList] = useRecoilState(patientRecoilList);
  const [renderList, setRenderList] = useState<PatientDataProps[]>([]);

  const thClsName =
    "px-3 font-normal text-app_gray_700 leading-4 text-xs tracking-[-0.24px]";

  const PatinetDataComponent = ({ data, idx }: IPDCProps) => {
    const tdClsName =
      "h-full px-3 text-app_gray_750 leading-5 text-xs font-normal";

    const handleDiagChart = () => {
      Router.push(`/diagchart/${data.soapUuid}`);
    };

    return (
      <tr className="w-full h-10">
        <td className={`${tdClsName}`}>{idx}</td>
        <td className={`${tdClsName}`}>{data.patient.name}</td>
        <td className={`${tdClsName}`}>
          {moment(data.patient.birthDate).format("YYYY.MM.DD")}
        </td>
        <td className={`${tdClsName}`}>
          {data.patient.gender === "f" ? "여" : "남"}
        </td>
        <td className={`${tdClsName}`}>{data.patient.age}세</td>
        <td className={`${tdClsName}`}>{data.cc}</td>
        <td className={`${tdClsName}`}>
          {moment(data.submitTime).format("HH:mm")}
        </td>
        <td className={`${tdClsName}`}>
          {data.status === "WAITING" ? (
            <CustomButton
              type={1}
              value="진료 시작"
              onClick={() => handleDiagPatch(data, "IN_PROGRESS")}
            />
          ) : data.status === "IN_PROGRESS" ? (
            <CustomButton
              type={2}
              value="진료 중"
              onClick={() => handleDiagPatch(data, "COMPLETED")}
            />
          ) : (
            <CustomButton type={2} value="진료 완료" />
          )}
        </td>
        <td className={`${tdClsName} bg-red`}>
          <CustomButton type={3} value="상세보기" onClick={handleDiagChart} />
        </td>
      </tr>
    );
  };

  // useEffect(() => {
  //   getPatientList().then((res) => {
  //     setPatientList(res.patientList);
  //   });
  // }, []);

  const handleDiagPatch = async (data: PatientDataProps, status: string) => {
    await patchDiagStatus(data.visitRecordId, status);
    getPatientList(
      0,
      20,
      undefined,
      moment(selectedDate).format("YYYY-MM-DD")
    ).then((res) => {
      setPatientList(res.patientList);
    });
  };

  const handleDateChange = async () => {
    const res = await getPatientList(
      undefined,
      undefined,
      undefined,
      moment(selectedDate).format("YYYY-MM-DD")
    );
    setPatientList(res.patientList);
  };

  useEffect(() => {
    setOpenCalendar(false);
    handleDateChange();
  }, [selectedDate]);

  return (
    <div className="h-full w-Content">
      <div className="flex flex-col w-full h-full pl-10 pr-6 bg-app_gray_100 pb-7">
        <div className="w-full h-fit mt-[3.75rem] mb-10 font-bold text-xl">
          환자 목록
        </div>
        <div className="flex flex-row w-full mb-3 text-base font-bold h-fit">
          <div className="flex flex-row items-center w-[642px] flex-grow h-5 gap-3">
            <div className="pr-3 border-r border-app_gray_300">진료날짜</div>
            <div className="relative flex flex-row gap-3 ">
              <div
                className="text-app_healthier_blue text-[14px] font-bold leading-5"
                onClick={() => {
                  setOpenCalendar((prev) => !prev);
                }}
              >
                {moment(selectedDate).format("YYYY년 M월 D일 ") +
                  weekday[selectedDate.getDay()] +
                  "요일"}
              </div>
              {openCalendar ? (
                <Image
                  src={iconUpSrc}
                  alt="up"
                  onClick={() => {
                    setOpenCalendar(false);
                  }}
                />
              ) : (
                <Image
                  src={iconFoldSrc}
                  alt="fold"
                  onClick={() => {
                    setOpenCalendar(true);
                  }}
                />
              )}
              {openCalendar && (
                <div className="absolute z-10 p-4 bg-white border top-10 rounded-xl">
                  <TimeTableCalendar
                    date={selectedDate}
                    setDate={setSelectedDate}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="basis-[310px] flex justify-start">진료완료 환자</div>
        </div>

        <div className="flex flex-row flex-grow w-full gap-4 h-[300px]">
          {/* 진료대기 환자 리스트 */}
          <div className="flex flex-col items-start justify-start flex-grow h-full w-[300px] p-4 bg-white rounded-2xl">
            {/* 진료대기 header */}
            <div className="flex flex-row justify-between w-full mb-3 h-fit">
              <div className="w-60">
                <CustomInput
                  key="waiting"
                  holder="환자 이름을 검색해주세요"
                  value={searchWaiting}
                  onChange={(value) => setSearchWaiting(value)}
                />
              </div>
              <span className="self-end text-app_gray_400_body_2 font-normal text-[10px] tracking-[-0.27px]">
                환자의 진료를 시작하기 전 [ 진료 시작 ] 버튼을 눌러주세요
              </span>
            </div>

            {/* 진료대기 body */}
            <table className="w-full h-9">
              <colgroup>
                <col style={{ width: "6.5%" }} />
                <col style={{ width: "9.8%" }} />
                <col style={{ width: "13.7%" }} />
                <col style={{ width: "8.1%" }} />
                <col style={{ width: "8.1%" }} />
                <col style={{ width: "16.3%" }} />
                <col style={{ width: "11.8%" }} />
                <col style={{ width: "13.1%" }} />
                <col style={{ width: "13.1%" }} />
              </colgroup>
              <thead className="text-left h-9 border-app_gray_300 border-y-[0.8px]">
                <tr>
                  <th className={`${thClsName}`}>No</th>
                  <th className={`${thClsName}`}>이름</th>
                  <th className={`${thClsName}`}>생년월일</th>
                  <th className={`${thClsName}`}>성별</th>
                  <th className={`${thClsName}`}>나이</th>
                  <th className={`${thClsName}`}>C.C</th>
                  <th className={`${thClsName}`}>제출시간</th>
                  <th className={`${thClsName}`}>상태</th>
                  <th className={`${thClsName}`}>문진차트</th>
                </tr>
              </thead>
            </table>
            <div className="w-full overflow-auto">
              <table className="w-full h-full">
                <colgroup>
                  <col style={{ width: "6.5%" }} />
                  <col style={{ width: "9.8%" }} />
                  <col style={{ width: "13.7%" }} />
                  <col style={{ width: "8.1%" }} />
                  <col style={{ width: "8.1%" }} />
                  <col style={{ width: "16.3%" }} />
                  <col style={{ width: "11.8%" }} />
                  <col style={{ width: "13.1%" }} />
                  <col style={{ width: "13.1%" }} />
                </colgroup>
                <tbody className="h-full text-left">
                  {searchWaiting === "" ? (
                    patientList.length > 0 ? (
                      patientList.map((patient, idx) => {
                        return (
                          <PatinetDataComponent
                            key={patient.visitRecordId}
                            data={patient}
                            idx={idx + 1}
                          />
                        );
                      })
                    ) : (
                      <tr className="w-full">
                        <td className="w-full">
                          진료 예약 대기중인 환자가 없습니다
                        </td>
                      </tr>
                    )
                  ) : (
                    patientList
                      .filter((elem) =>
                        elem.patient.name.includes(searchWaiting)
                      )
                      .map((patient, idx) => {
                        return (
                          <PatinetDataComponent
                            key={patient.visitRecordId}
                            data={patient}
                            idx={idx + 1}
                          />
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="basis-[310px] flex justify-start">
            <ReservedList
              data={patientList}
              searchComplete={searchComplete}
              setSearchComplete={setSearchComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PatientList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PatientList;
