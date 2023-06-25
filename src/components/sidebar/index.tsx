import { SidebarMenu } from "@/assets/sidebarMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HospitalProfile = () => {
  return (
    <>
      <div className="w-4/5 h-8 flex flex-row justify-betweenself-center">
        <div className="w-8 mr-3 ml-6 h-full aspect-[1/1] rounded-md relative">
          <Image
            src="/images/sidebar/hospitalIcon.png"
            alt="hospital logo"
            fill
            sizes={"100%"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-full h-full flex items-center text-white font-bold">
          헬시어 병원
        </div>
      </div>
      <span className="w-4/5 h-[1px] border-t-[1px] border-app_stroke_blue self-center mt-6 mb-4"></span>
    </>
  );
};

const Sidebar = () => {
  const router = useRouter();
  return (
    <nav
      className={`w-Sidebar h-full bg-app_indigo flex flex-col justify-start items-start`}
    >
      {/* Logo Container */}
      <div className="w-[120px] h-[20px] relative mt-8 ml-6 mb-9">
        <Image
          src="/images/appLogo.png"
          alt="App Logo"
          fill
          sizes={"100%"}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
      <HospitalProfile />
      {SidebarMenu.map((menu, index) => {
        return (
          <div
            key={index}
            className={`w-4/5 h-9 flex flex-row justify-between mb-2 self-center`}
          >
            <Link
              href={menu.link}
              className={`${
                router.pathname === menu.link ? "bg-app_healthier_indigo" : ""
              } w-full h-full text-sm font-normal px-5 py-4 rounded-md flex items-center text-white`}
            >
              {menu.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Sidebar;
