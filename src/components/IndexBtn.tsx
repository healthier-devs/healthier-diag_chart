interface IIBProps {
  placeholder: string;
  type: number;
}

const IndexBtn = ({ placeholder, type }: IIBProps) => {
  const btnTextCls = "text-app_gray_500 text-xs font-bold";
  return (
    <div
      className={`px-3 flex justify-center items-center bg-gray-100 text-center rounded-3xl ${btnTextCls} ${
        type === 1
          ? "min-w-[70px] h-[28px] "
          : "h-[38px] whitespace-pre-wrap w-[76px]"
      }`}
    >
      {placeholder}
    </div>
  );
};

export default IndexBtn;
