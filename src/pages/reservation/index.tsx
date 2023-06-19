import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/layouts/Layout";

import Sidebar from "@/components/sidebar";
import TimeTable from "@/components/timetable";

const ReservationPage: NextPageWithLayout = () => {
  return (
    <div className={`w-Content h-[100vh] bg-red-200`}>
      {/* [TEMP]: items and justify for temporary, change needed */}
      <div className="w-full h-full relative flex justify-end items-center">
        <TimeTable />
      </div>
    </div>
  );
};

ReservationPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ReservationPage;
