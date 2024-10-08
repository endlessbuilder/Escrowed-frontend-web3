"use client";
import { Button } from "@/components/ui/button";
import { Check, CheckCheck, Copy, HandCoins, Info, Send } from "lucide-react";
import report from "@/app/report-icon.png";
import Image from "next/image";
import React, { useState } from "react";
import RequestFunds from "@/components/RequestFunds";
import SellerApplication from "@/components/SellerApplication";

import web3 from "@/utils/web3";
import escrowed from "@/utils/escrowed";

function DeedDetailsBuyer() {
  const mileStones = false;
  const completed = false;
  const completedMilestone = true;
  const approved = true;
  const [mileStonesObj, setMileStonesObj] = useState([
    {
      id: 0,
      milestone: "Userflow & designing",
      amount: "1200",
      expectedTime: "1week",
      isCompleted: true,
    },
    {
      id: 1,
      milestone: "Frontend Development",
      amount: "1200",
      expectedTime: "3weeks",
      isCompleted: false,
    },
    {
      id: 2,
      milestone: "Backend development & smart contract",
      amount: "1200",
      expectedTime: "4weeks",
      isCompleted: false,
    },
  ]);
  const paymentPending = false;  

  return !approved ? (
    <div className="h-screen w-screen flex flex-col items-start justify-start bg-[#F8F8F8] p-4 overflow-x-hidden gap-y-5">
      <div className="flex flex-col justify-center gap-y-2">
        {/* Header */}
        <div className="text-[#52B9FF] text-sm font-bold">
          <p>ID: 3kh4kh21</p>
        </div>
        <header className="text-[#484848] text-lg font-bold">
          <h1>Escrowed Telegram Mini App</h1>
        </header>
        <div className="text-sm text-[#5D5D5D]">
          <p>
            This will be a simple escrow app made for telegram app store. This
            will allow users to create escrow...{" "}
            <span className="text-[#52B9FF] underline">Read more</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center p-2 bg-[#DFEFFF] w-full rounded-md">
        <div className="flex gap-2 text-xs items-center justify-center">
          <Info className="text-[#52B9FF]" />
          <p className="text-[#5D5D5D] font-bold">Project Status</p>
        </div>
        <div className="text-xs text-[#5D5D5D]">
          {paymentPending ? (
            <p>Payment Pending</p>
          ) : (
            <p>{completed ? "Completed" : "Ongoing"}</p>
          )}
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

        {!paymentPending && (
          <>
            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex justify-between text-[#5D5D5D]">
                <p>Deed Seller</p>
                <p className="text-[#52B9FF]">bas3kkk</p>
              </div>
            </div>
            <div className="p-[0.5px] bg-[#EDEDED]"></div>
          </>
        )}

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
        {mileStones && (
          <div className="flex flex-col gap-y-3 py-2 w-full">
            {/* Deed Details */}
            <div>
              <h1 className="text-[#484848] font-bold">Milestones</h1>
            </div>
            {mileStonesObj.map((val) => {
              return (
                <>
                  <div className="w-full flex flex-col gap-y-2">
                    <div className="w-full flex justify-between text-[#5D5D5D]">
                      <div className="flex justify-center items-center gap-2">
                        <p>{val.milestone}</p>
                        {val?.isCompleted && (
                          <Check className="rounded-full bg-[#52B9FF] text-[#FFFFFF] w-3 h-3" />
                        )}
                      </div>
                      <p className="text-[#52B9FF]">
                        ${val?.amount}({val?.expectedTime})
                      </p>
                    </div>
                  </div>
                  <div className="p-[0.5px] bg-[#EDEDED]"></div>
                </>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-3 w-full">
        <div className="flex flex-col gap-y-2 w-full">
          <h1 className="text-lg font-bold text-[#484848]">
            Seller Applications
          </h1>
          <p className="text-[#484848] text-sm">
            Select the seller for this contract
          </p>
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <SellerApplication seller="Hxweasdf22" time="25 min ago" />
          <SellerApplication seller="Hxweasdf22" time="25 min ago" />
          <SellerApplication seller="Hxweasdf22" time="25 min ago" />
          <Button className="w-full bg-[#FFFFFF] flex justify-center items-center gap-2 text-[#000000] border-[#EDEDED] border-2">
            <CheckCheck /> Select Seller
          </Button>
        </div>
      </div>
      <div className="w-full flex gap-2 min-h-[120px]">
        {/* Share */}
        {paymentPending ? (
          <>
            <div className="w-1/2">
              <Button className="w-full bg-[#52B9FF] flex justify-center items-center gap-2 hover:bg-[#52B9FF]">
                <Send className="text-[#FFFFFF] text-sm" />
                Share
              </Button>
            </div>
            <div className="w-1/2">
              <Button className="w-full bg-[#DFEFFF] text-[#52B9FF] flex justify-center items-center gap-2 border-[#52B9FF] border-2 hover:bg-[#DFEFFF] hover:text-[#52B9FF] ">
                <Copy className="text-[#52B9FF]" />
                Copy
              </Button>
            </div>
          </>
        ) : (
          !completed && (
            <>
              <div className="w-1/2">
                <Button className="w-full bg-[#52B9FF] flex justify-center items-center gap-2">
                  <HandCoins className="text-[#FFFFFF] text-sm" />
                  Request Funds
                </Button>
              </div>
              <div className="w-1/2">
                <Button className="w-full bg-[#DFEFFF] text-[#52B9FF] flex justify-center items-center gap-1 border-[#52B9FF] border-2">
                  <Image src={report} alt="report" />
                  Copy
                </Button>
              </div>
            </>
          )
        )}
      </div>
    </div>
  ) : (
    <RequestFunds />
  );
}

export default DeedDetailsBuyer;
