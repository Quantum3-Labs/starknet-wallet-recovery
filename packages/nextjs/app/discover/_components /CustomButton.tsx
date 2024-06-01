import React from "react";

interface IProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
export const CustomButton = ({ text, onClick, disabled = false }: IProps) => {
  return (
    <button
      disabled={disabled}
      className="border-2 rounded-full px-20 py-3 border-black"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
