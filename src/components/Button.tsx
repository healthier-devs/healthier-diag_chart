interface CBProps {
  type: number;
  value: string;
  onClick?: () => void;
}

const CustomButton = ({ type, value, onClick }: CBProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center h-6 rounded-md w-[60px] cursor-pointer ${
        type === 1
          ? "bg-app_blue_50 border-[0.8px] border-app_blue_100"
          : type === 2
          ? "bg-app_gray_100 border-[0.8px] border-app_gray_200_body_1"
          : "bg-app_blue_500"
      }`}
    >
      <span
        className={`text-[11px] tracking-[-0.3px] ${
          type === 1
            ? "text-app_blue_500"
            : type === 2
            ? "text-app_gray_500"
            : "text-app_gray_100"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default CustomButton;
