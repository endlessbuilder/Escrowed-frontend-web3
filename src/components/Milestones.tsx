"use client";
import React, { useRef } from "react";

function Milestones(props: { milestone: string; amount: string }) {
  const radioRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div
        className="w-full flex justify-between text-[#5D5D5D]"
        onClick={() => {
          if (radioRef?.current) {
            if (radioRef?.current?.checked) {
              radioRef.current.checked = false;
            } else {
              radioRef.current.checked = true;
            }
          }
        }}
      >
        <div className="flex gap-1 items-center justify-center">
          <input
            type="radio"
            className="border-[#52B9FF] border-2 outline-none bg-[#52B9FF]"
            ref={radioRef}
          />
          <label>{props?.milestone}</label>
        </div>
        <p className="text-[#52B9FF]">${props?.amount}</p>
      </div>
      <div className="p-[0.5px] bg-[#EDEDED]"></div>
    </div>
  );
}

export default Milestones;
