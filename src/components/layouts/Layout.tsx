import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-row p-4 bg-app_gray_100">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
