import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
