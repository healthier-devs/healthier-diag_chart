import { useState, type ReactElement, useEffect } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import leftIconSrc from "@/assets/images/icon_chevron_left.svg";
import Image from "next/image";
import { GetServerSideProps } from "next";
import IndexBtn from "@/components/IndexBtn";
import { getDiagChart, noteDiagChart } from "@/api/patient";
import modifyIconSrc from "@/assets/images/icon_modify.svg";

interface IChartProps {
  name: string;
  value: string[];
  symbol: string[];
}
interface IDataProps {
  name: string;
  gender: "f" | "m" | string; //TODO : can gender be string?
  age: number;
  height?: string | number;
  weight?: string | number;
  chart: IChartProps[];
  pain_site: string[];
  result: string[];
  note: string | null;
  cc: string;
}

interface IDCProps {
  id: string;
}

interface IUserType {
  name: string;
  gender?: "f" | "m";
  age: number;
  height?: number;
  weight?: number;
  cc: string;
  ROS: {
    Onset: string;
    Location: string;
    Character: string;
    Character1: string;
    Character2: string;
    Duration: string;
    Expericnce: string;
    NRS: number;
    Severity: string;
    PDH: string | null;
  };
  ps_illness: string; // Present illness
  pt_factor: string; // Pt factor
  pain_site: string; // 증상 부위
  pt_note: string; //Pt.note
  result: string[]; // 의심 질환
  note: string | null; // 진료 기록
}
const ROS_List = [
  "Onset",
  "Location",
  "Character",
  "Character1",
  "Character2",
  "Duration",
  "Experience",
  "NRS",
  "Severity",
  "PDH",
];

const translateData = (data: IDataProps, setUserData: Function) => {
  let tmpData = {
    name: data.name,
    gender: data.gender === "f" ? "F" : data.gender === "m" ? "M" : undefined,
    age: data.age,
    height: Number(data.height) ?? undefined,
    weight: Number(data.weight) ?? undefined,
    cc: data.cc,
    ROS: ROS_List.reduce((accumulator, ROS) => {
      let target = data.chart?.find(
        (elem) => elem.name.split("$")[1] === ROS
      )?.value;

      if (target && target.length > 1) {
        accumulator[ROS] = target.join(" / ");
      } else if (target && target.length === 1) {
        accumulator[ROS] = target[0];
      } else if (target === undefined) {
        accumulator[ROS] = "";
      } else {
        accumulator[ROS] = null;
      }

      return accumulator;
    }, {} as { [key: string]: string | null }),
    ps_illness:
      data.chart
        .find((elem) => elem.name === "Internal factor")
        ?.value.join("\n") || "",
    pt_factor:
      data.chart
        .find((elem) => elem.name === "Patient factor")
        ?.value.join("\n") || "",
    pain_site: data.pain_site.join(" / "),
    pt_note:
      data.chart.find((elem) => elem.name === "Pt. note")?.value.join("\n") ||
      "",
    result: data.result,
    note: data.note,
  };

  setUserData(tmpData);
};

interface IBIProps {
  height: string;
  setHeight: Function;
  weight: string;
  setWeight: Function;
}
const BMIInput = ({ height, setHeight, weight, setWeight }: IBIProps) => {
  return (
    <div className="rounded-xl">
      <input
        className="text-[11px] leading-5 text-app_gray_600 w-16 pl-4 h-7 rounded-l-xl focus:outline-none"
        value={height}
        placeholder="Height"
        onChange={(e) => setHeight(e.target.value)}
      />
      /
      <input
        className="text-[11px] leading-5 text-app_gray_600 w-16 px-2 h-7 rounded-r-xl focus:outline-none"
        value={weight}
        placeholder="Weight"
        onChange={(e) => setWeight(e.target.value)}
      />
    </div>
  );
};
const DiagChart: NextPageWithLayout<IDCProps> = ({ id }) => {
  const Router = useRouter();
  const [userData, setUserData] = useState<IUserType>();
  const [newNote, setNewNote] = useState<string>("");
  const [modifyBMI, setModifyBMI] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const bbCls = " border-b-[0.8px] border-app_gray_200_body_1";
  const text1Cls = " text-app_gray_750 text-sm font-normal leading-5";
  const text2Cls =
    " text-app_gray_600 text-xs font-normal leading-5 tracking-[-0.3px]";

  useEffect(() => {
    getDiagChart(id).then((res) => translateData(res, setUserData));
  }, [id]);

  useEffect(() => {
    if (userData) {
      setNewNote(userData.note || "");
      setHeight(String(userData.height) || "");
      setWeight(String(userData.weight) || "");
    }
  }, [userData]);

  const handleNewNote = () => {
    if (newNote !== userData?.note) {
      noteDiagChart(id, {
        note: newNote,
      }).then((res) => {
        setUserData((prev) => {
          if (prev) {
            return {
              ...prev,
              note: res.note,
            };
          }
        });
      });
    }
  };

  // useEffect(() => {
  //   translateData(dummyData, setUserData);
  // }, []);

  const handleChangeBMI = (
    e: React.ChangeEvent<HTMLInputElement>,
    which: string
  ) => {
    if (which === "height") {
      setHeight(e.target.value);
    } else {
      setWeight(e.target.value);
    }
  };

  return userData ? (
    <div className="h-full w-Content">
      <div className="flex flex-col w-full h-full px-8 pb-12 bg-app_gray_100">
        <div className="mt-[60px] flex gap-1.5 items-center h-fit mb-5">
          <Image
            src={leftIconSrc}
            alt="leftIcon"
            className="cursor-pointer"
            onClick={() => Router.push("/patientList")}
          />
          <span className="text-xl leading-5 text-app_gray_800_tag_box">
            <span className="font-bold">{userData.name}님</span>
            <span className="font-normal"> 초진차트</span>
          </span>
        </div>
        <div className="flex flex-row flex-grow w-full h-[300px] gap-4">
          <div className="flex flex-col items-start justify-start flex-grow w-[547px] h-full bg-white rounded-2xl p-4">
            {/* 1열 */}
            <div className={`w-full flex flex-row gap-12 pt-1 pb-4 ${bbCls}`}>
              <span className={"flex flex-row items-center gap-3" + text1Cls}>
                <IndexBtn placeholder="Gender/Age" type={1} />
                {userData.gender?.toUpperCase() || "None"} / {userData.age}
              </span>
              <span className={"flex flex-row items-center gap-3" + text1Cls}>
                <IndexBtn placeholder="Height/Weight" type={1} />
                {modifyBMI ? (
                  <BMIInput
                    height={height}
                    setHeight={setHeight}
                    weight={weight}
                    setWeight={setWeight}
                  />
                ) : userData.height || userData.weight ? (
                  <>
                    {userData.height}cm / {userData.weight}kg
                  </>
                ) : (
                  <div className="text-app_gray_200 text-[11px] leading-5 border-app_sub_blue rounded-xl border-[0.6px] w-[140px] h-7 justify-center items-center flex">
                    BMI 정보를 입력해주세요
                  </div>
                )}
                <Image
                  src={modifyIconSrc}
                  alt="modifyIcon"
                  className="cursor-pointer"
                  onClick={() => {
                    setModifyBMI((prev) => !prev);
                    if (modifyBMI) {
                      noteDiagChart(id, {
                        height: Number(height),
                        weight: Number(weight),
                      }).then((res) => {
                        setUserData((prev) => {
                          if (prev) {
                            return {
                              ...prev,
                              height: Number(height),
                              weight: Number(weight),
                            };
                          }
                        });
                      });
                    }
                  }}
                />
              </span>
            </div>
            {/* 2열 */}
            <div
              className={"flex flex-col w-full h-fit gap-4 pt-4 pb-4" + bbCls}
            >
              <div
                className={
                  "flex flex-row items-center gap-6" +
                  " text-app_gray_600 text-sm font-medium leading-5"
                }
              >
                <IndexBtn placeholder="CC" type={1} />
                {userData.cc}
              </div>
              <div
                className={
                  "flex flex-grow flex-row justify-start items-start gap-6 "
                }
              >
                <IndexBtn placeholder="ROS" type={1} />
                <div
                  className={"flex flex-col w-full overflow-x-auto" + text2Cls}
                >
                  {ROS_List.map((elem, idx) => {
                    return (
                      <div key={idx}>
                        <span className="">{elem} : </span>
                        <span>
                          {userData.ROS[elem as keyof typeof userData.ROS] ||
                            "None"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* 3열 */}
            <div
              className={
                "flex flex-row w-full h-[68px] gap-5 pt-4 pb-4" + bbCls
              }
            >
              <IndexBtn placeholder={`Present\nIllness`} type={2} />
              <div className={"flex flex-col w-full" + text2Cls}>
                <span className="">{userData.ps_illness}</span>
              </div>
            </div>
            {/* 4열 */}
            <div className={"flex flex-row w-full h-fit gap-5 pt-4"}>
              <IndexBtn placeholder={`Patient\nFactor`} type={2} />
              <div
                className={
                  "flex flex-col w-full whitespace-pre-wrap" + text2Cls
                }
              >
                <span className="">{userData.pt_factor}</span>
              </div>
            </div>
          </div>
          <div className="basis-[285px] w-full h-full flex flex-col justify-between">
            <div className="flex h-[16.1%] bg-white rounded-xl p-4 flex-col gap-3">
              <div className="w-fit">
                <IndexBtn placeholder="증상 부위" type={1} />
              </div>
              <span className={text2Cls + "h-full overflow-y-auto"}>
                {userData.pain_site}
              </span>
            </div>
            <div className="flex h-[28%] bg-white rounded-xl p-4 flex-col gap-3">
              <div className="w-fit">
                <IndexBtn placeholder="Pt. note" type={1} />
              </div>
              <span className={text2Cls + "h-full overflow-y-auto"}>
                {userData.pt_note}
              </span>
            </div>
            <div
              className={"flex h-[21%] bg-white rounded-xl p-4 flex-col gap-3"}
            >
              <div className={`w-fit `}>
                <IndexBtn placeholder="의심질환 : R/O" type={1} />
              </div>
              <span className={text2Cls + "h-full overflow-y-auto"}>
                {userData.result.map((elem, idx) => {
                  return <li key={idx}>{elem}</li>;
                })}
              </span>
            </div>
            <div className="flex h-[30.5%] bg-white rounded-xl p-4 flex-col gap-3">
              <div className="w-fit">
                <IndexBtn placeholder="진료기록" type={1} />
              </div>
              <div className="flex w-full h-full overflow-y-auto border border-app_gray_200_body_1 rounded-xl">
                <textarea
                  className={
                    text2Cls +
                    "text-app_gray_400 h-full w-full focus:outline-none p-2"
                  }
                  placeholder={newNote || "진료 시 소견을 적어주세요"}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onBlur={handleNewNote}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};

DiagChart.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DiagChart;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
};
