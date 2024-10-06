"use client";
import { House, Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed z-20 bottom-0 w-full flex justify-around bg-[#FFFFFF] text-[#5D5D5D] py-1">
      <Link href={"/"} className="cursor-pointer">
        <div className="flex justify-center items-center text-xs flex-col">
          <div
            className={
              pathname === "/"
                ? "flex justify-center items-center bg-[#DFEFFF] text-[#52B9FF] p-2 rounded-lg"
                : "flex justify-center items-center p-2"
            }
          >
            <House />
          </div>
          <p>Home</p>
        </div>
      </Link>
      <Link href={"/marketplace"} className="cursor-pointer">
        <div className="flex justify-center items-center text-xs flex-col">
          <div
            className={
              pathname === "/marketplace"
                ? "flex justify-center items-center bg-[#DFEFFF] text-[#52B9FF] p-2 rounded-md"
                : "flex justify-center items-center p-2"
            }
          >
            <Store />
          </div>
          <p>Market place</p>
        </div>
      </Link>
      <Link href={"/account"} className="cursor-pointer">
        <div className="flex justify-center items-center text-xs flex-col">
          <div
            className={
              pathname === "/account"
                ? "flex justify-center items-center bg-[#DFEFFF] text-[#52B9FF] p-2 rounded-md"
                : "flex justify-center items-center p-2"
            }
          >
            <User />
          </div>
          <p>Account</p>
        </div>
      </Link>
    </nav>
  );
};

export default Footer;
