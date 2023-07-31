import Image from "next/image";
import srcSearchImg from "@/assets/images/icon_search.svg";
import { useEffect } from "react";

interface IInputProps {
  holder: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomInput = ({ holder, value, onChange }: IInputProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    console.log(value);
  };

  return (
    <div className="relative flex flex-row items-center justify-between w-full pr-5 h-9 bg-app_gray_100 rounded-2xl">
      <input
        placeholder={holder}
        value={value}
        onChange={changeHandler}
        className="w-full px-5 py-2 text-xs font-normal bg-transparent text-app_gray_400_body_2 focus:outline-none"
      />
      <Image
        src={srcSearchImg}
        alt="searchIcon"
        className="cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default CustomInput;
