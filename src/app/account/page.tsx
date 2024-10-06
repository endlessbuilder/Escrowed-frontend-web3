// import Image from "next/image";
import {
  ChevronRight,
  CircleHelp,
  CornerUpRight,
  Headset,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const MarketPage = () => {
  return (
    <div className="p-4 bg-gray-200 text-black">
      <div className="text-2xl font-bold mb-4">Account</div>
      <div className="flex flex-col items-start justify-start h-[70vh]">
        <div className="flex items-center justify-start gap-3 w-full my-8">
          <div
            //   src="https://via.placeholder.com/150"
            //   alt="Profile"
            className="rounded-full w-10 h-10 bg-black"
          />
          <div className="flex flex-col gap-y-2">
            <div className="text-xl">John Doe</div>
            <div className="text-sm text-[#52B9FF]">Johndoe123</div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4 text-[#5D5D5D]">
          <Link href="/faq">
            <div className="flex justify-between p-4 w-full bg-[#FFFFFF] rounded-sm hover:cursor-pointer">
              {/* FAQ */}
              <div className="flex gap-2 justify-center items-center hover:cursor-pointer">
                <CircleHelp />
                <p>Frequently Asked Questions</p>
              </div>
              <div className="flex justify-center items-center">
                <ChevronRight />
              </div>
            </div>
          </Link>
          <div className="flex justify-between p-4 w-full bg-[#FFFFFF] rounded-sm hover:cursor-pointer">
            {/* Suggestion */}
            <div className="flex gap-2 justify-center items-center">
              <Lightbulb />
              <p>Submit a Suggestion</p>
            </div>
            <div className="flex justify-center items-center">
              <ChevronRight />
            </div>
          </div>
          <div className="flex justify-between p-4 w-full bg-[#FFFFFF] rounded-sm hover:cursor-pointer">
            {/* Share App */}
            <div className="flex gap-2 justify-center items-center">
              <CornerUpRight />
              <p>Share App</p>
            </div>
            <div className="flex justify-center items-center">
              <ChevronRight />
            </div>
          </div>
          <div className="flex justify-between p-4 w-full bg-[#FFFFFF] rounded-sm hover:cursor-pointer">
            {/* Contact Support */}
            <div className="flex gap-2 justify-center items-center">
              <Headset />
              <p>Contact Support</p>
            </div>
            <div className="flex justify-center items-center">
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
