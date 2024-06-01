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
