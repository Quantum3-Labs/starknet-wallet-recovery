// import React, { useState } from "react";
// import Image from "next/image";
//
// interface CustomCheckboxProps {
//   logoSrc: string;
//   symbol: string;
//   value: string;
// }
//
// const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
//   logoSrc,
//   symbol,
//   value,
// }) => {
//   const [isChecked, setIsChecked] = useState(false);
//
//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };
//
//   return (
//     <div className="flex justify-around items-center">
//       <div className="flex gap-4 items-center justify-center max-w-[140px] w-full">
//         <div className="rounded-full">
//           <Image
//             src={logoSrc}
//             alt="logo-assets"
//             width={50}
//             height={50}
//             className="rounded-full"
//           />
//         </div>
//         <div className="flex flex-col gap-2 justify-center">
//           <span>{symbol}</span>
//           <span>{value}</span>
//         </div>
//       </div>
//       <div className="">
//         <input type="checkbox" id="checkbox" className="checkbox-custom w-5" />
//         <label
//           htmlFor="checkbox"
//           className="checkbox-custom-label w-10 h-10"
//         ></label>
//       </div>
//     </div>
//   );
// };

// export default CustomCheckbox;
import { useState } from "react";

interface CustomCheckboxProps {
  logoSrc: string;
  symbol: string;
  value: string;
  onChange: (isChecked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  logoSrc,
  symbol,
  value,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <div className="flex items-center gap-3 justify-between w-full max-w-[880px]">
      <div className="flex items-start justify-start gap-4">
        <label htmlFor={value} className="flex items-center gap-1">
          <img src={logoSrc} alt={symbol} className="w-8 h-8 rounded-full" />
        </label>
        <div className="flex flex-col gap-2 justify-center">
          <span>{symbol}</span>
          <span>{value}</span>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-6 w-6 text-blue-500"
        />
      </div>
    </div>
  );
};

export default CustomCheckbox;
