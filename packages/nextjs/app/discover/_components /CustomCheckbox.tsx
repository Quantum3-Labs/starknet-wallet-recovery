import React, { useState } from "react";
import Image from "next/image";

interface CustomCheckboxProps {
  logoSrc: string;
  symbol: string;
  value: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  logoSrc,
  symbol,
  value,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex justify-around items-center">
      <div className="flex gap-4 items-center justify-center max-w-[140px] w-full">
        <div className="rounded-full">
          <Image src={logoSrc} alt="logo-assets" width={50} height={50} />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <span>{symbol}</span>
          <span>{value}</span>
        </div>
      </div>
      <div className="">
        <input type="checkbox" id="checkbox" className="checkbox-custom w-5" />
        <label
          htmlFor="checkbox"
          className="checkbox-custom-label w-10 h-10"
        ></label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
