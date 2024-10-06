"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import Milestones from "./Milestones";
import { Upload, XIcon } from "lucide-react";

function RequestFunds() {
  const [projectLink, setProjectLink] = useState("");
  const [mileStonesObj, setMileStonesObj] = useState([
    {
      id: 0,
      milestone: "Userflow & designing",
      amount: "1200",
      expectedTime: "",
    },
    {
      id: 1,
      milestone: "Frontend Development",
      amount: "1200",
      expectedTime: "",
    },
    {
      id: 2,
      milestone: "Backend development & smart contract",
      amount: "1200",
      expectedTime: "",
    },
  ]);
  const mileStones = true;
  const radioRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-screen w-screen flex flex-col items-start justify-start bg-[#F8F8F8] p-4 overflow-x-hidden gap-y-8">
      <div className="flex flex-col justify-center gap-y-2">
        {/* Header */}
        <header className="text-[#484848] text-lg font-bold">
          <h1>Request Funds</h1>
        </header>
      </div>
      <div className="flex flex-col gap-y-3 w-full">
        <div>
          <h1 className="text-[#484848] font-bold">Request Funds for</h1>
        </div>
        {!mileStones && (
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
                <label>Complete Project</label>
              </div>
              <p className="text-[#52B9FF]">$1200</p>
            </div>
          </div>
        )}
        {mileStones &&
          mileStonesObj.map((val) => {
            return (
              <>
                <Milestones milestone={val?.milestone} amount={val?.amount} />
              </>
            );
          })}
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        <div>
          <h1>Proof of work (Optional)</h1>
        </div>
        <div>
          <p>
            It’s recommended to upload work proofs for your contract. It will be
            very helpful in case of any fraud.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-y-2">
          <div className="flex p-2 justify-center items-center w-full bg-[#FFFFFF] border-[#C4C4C4] border-2 rounded-md">
            <input
              type="text"
              className="rounded-md outline-none w-full"
              placeholder="Project Link"
              onChange={(e) => setProjectLink(e.target.value)}
              value={projectLink}
            />
            <div
              onClick={() => {
                setProjectLink("");
              }}
            >
              <XIcon className="w-5 h-5 text-[#5D5D5D]" />
            </div>
          </div>
          <p className="text-[#C4C4C4]">Or</p>
          <div
            className="min-h-[120px] flex flex-col gap-y-2 justify-center items-center text-[#C4C4C4] border-[#C4C4C4] border-2 rounded-md w-full"
            onClick={() => {
              fileRef?.current?.click();
            }}
          >
            <Upload />
            <p>Select a file to upload</p>
            <input type="file" ref={fileRef} className="hidden" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 w-full">
        {/* Deed Details */}
        <div>
          <h1 className="text-[#484848] font-bold">Deed Info Summary</h1>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex justify-between text-[#5D5D5D]">
            <p>Deed Buyer</p>
            <p className="text-[#52B9FF]">You(34 Plebi)</p>
          </div>
        </div>
        <div className="p-[0.5px] bg-[#EDEDED]"></div>

        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex justify-between text-[#5D5D5D]">
            <p>Payment Distribution Type</p>
            <p className="text-[#52B9FF]">One Time</p>
          </div>
        </div>
        <div className="p-[0.5px] bg-[#EDEDED]"></div>

        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex justify-between text-[#5D5D5D]">
            <p>Deed Completion Time</p>
            <p className="text-[#52B9FF]">4.5 weeks</p>
          </div>
        </div>
        <div className="p-[0.5px] bg-[#EDEDED]"></div>

        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex justify-between text-[#5D5D5D]">
            <p>Total Deed Amount</p>
            <p className="text-[#52B9FF]">$1200</p>
          </div>
        </div>
        <div className="p-[0.5px] bg-[#EDEDED]"></div>
      </div>
      <div className="w-full flex gap-2 min-h-[120px]">
        {/* Share */}
        <div className="w-full">
          <Button className="w-full bg-[#52B9FF] flex justify-center items-center gap-2">
            Request Funds
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RequestFunds;

{
  /* <div className="flex flex-col gap-y-2 w-full">
        <div>
          <h1>Proof of work (Optional)</h1>
        </div>
        <div>
          <p>
            It’s recommended to upload work proofs for your contract. It will be
            very helpful in case of any fraud.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-y-2">
          <div className="flex p-2 justify-center items-center w-full bg-[#FFFFFF] border-[#C4C4C4] border-2 rounded-md">
            <input
              type="text"
              className="rounded-md outline-none w-full"
              placeholder="Project Link"
              onChange={(e) => setProjectLink(e.target.value)}
              value={projectLink}
            />
            <div
              onClick={() => {
                setProjectLink("");
              }}
            >
              <XIcon className="w-5 h-5 text-[#5D5D5D]" />
            </div>
          </div>
          <p className="text-[#C4C4C4]">Or</p>
          <div
            className="min-h-[120px] flex flex-col gap-y-2 justify-center items-center text-[#C4C4C4] border-[#C4C4C4] border-2 rounded-md w-full"
            onClick={() => {
              fileRef?.current?.click();
            }}
          >
            <Upload />
            <p>Select a file to upload</p>
            <input type="file" ref={fileRef} className="hidden" />
          </div>
        </div>
      </div> */
}
