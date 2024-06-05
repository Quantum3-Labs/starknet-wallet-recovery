import { ChangeEvent, ReactNode } from "react";

interface CustomCheckboxProps {
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: ReactNode;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  value,
  onChange,
  name,
  label,
}) => {
  return (
    <label
      htmlFor={`${name}-${value}`}
      className="flex cursor-pointer items-center gap-3 justify-between w-full max-w-[880px]"
    >
      {label}
      <div>
        <input
          id={`${name}-${value}`}
          type="checkbox"
          onChange={onChange}
          className="form-checkbox h-6 w-6 text-blue-500"
          name={name}
          value={value}
        />
      </div>
    </label>
  );
};

export default CustomCheckbox;
