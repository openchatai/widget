import React from "react";
import { Button } from "./button";
type Props = {
  options: string[];
  onKeyboardClick: (option: string) => void;
};

function Keyboard({ options, onKeyboardClick }: Props) {
  return (
    <div className="flex items-center gap-2 p-2 flex-wrap">
      {options.map((option, index) => (
        <Button
          onClick={() => onKeyboardClick(option)}
          className="flex-1 rounded-full"
          size="sm"
          key={index}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
export { Keyboard };
