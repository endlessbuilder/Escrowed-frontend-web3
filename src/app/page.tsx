"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Banknote,
  Bell,
  BriefcaseBusiness,
  CheckCheck,
  ChevronDown,
  Handshake,
  Plus,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [category, setCategory] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>("");
  const [role, setRole] = useState<string | null>("");
  const [date, setDate] = useState<string | null>("");
  const [isDeedPopupOpen, setDeedPopup] = useState(false);
  return (
    <div className="h-screen w-screen flex flex-col items-start justify-start bg-gray-200 p-6 overflow-x-hidden">
      <div className="flex items-center justify-between w-full mt-4 mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="">
            <Avatar className="w-14 h-14">
              <AvatarImage
                className="h-24 w-24 object-cover"
                src="https://s3-alpha-sig.figma.com/img/206f/7d73/ad181b17fcb71bebb0d89e011174038c?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IHiojlzSMpKk~zY-VGfNozCna4~xIEARzNb9Bx6llJOGjkGGi--H0dbPXKLAhN1DOBdd~-1PfoWyu4VMgg3UDjwD0Kha~7ffBrMbFFtpVuYO~rsZRdMVoLXXDKAuylYW-B3-3L-S1YHM9K4toHaRxAaVWFOfQ~orJ4ohSCwcJO-10Q6vGMG1z2qLbrVR-6D8RMUPT2x5tD4djFYF5YCXyXVtpoZGULSYZ78w7YArc49FnZNJnDZq8pdwoEDcBSbWwUC8jz7TevxPGuZDjxEwp0XT-UsuAKU8cxsMp~Pttz-wmHBQdnHVg5lTaenxuPA5tbD12GMrDxSCEfUHMq-GUg__"
              />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-lg text-gray-400">Hello,</p>
            <p className="text-lg text-black">Martha Johnson</p>
          </div>
        </div>
        <Link href="/notifications">
          <div className="bg-[#FFFFFF] w-14 h-14 p-2 rounded-full flex flex-col justify-center items-center cursor-pointer">
            <div className="w-full flex justify-end">
              <div className="w-2 h-2 bg-[#52B9FF] items-start rounded-full"></div>
            </div>
            <Bell className="w-full h-full" />
          </div>
        </Link>
      </div>
      <p className="my-6 text-[#484848] font-semibold text-xl text-left w-full">
        Your Activity
      </p>
      <div className="my-4 flex flex-col items-center justify-center w-full gap-4">
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="bg-white border-[2px] w-1/2 border-[#EDEDED] rounded-lg py-3 px-2 flex items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-[#52B9FF]">
              <Zap className="text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-xs text-[#5D5D5D]">Active Deeds</p>
              <p className="text-lg text-black">6</p>
            </div>
          </div>
          <div className="bg-white border-[2px] w-1/2 border-[#EDEDED] rounded-lg py-3 px-2 flex items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-[#52B9FF]">
              <CheckCheck className="text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-sm text-[#5D5D5D]">Completed</p>
              <p className="text-lg text-black">0</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <div className="bg-white border-[2px] w-1/2 border-[#EDEDED] rounded-lg py-3 px-2 flex items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-[#52B9FF]">
              <BriefcaseBusiness className="text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-sm text-[#5D5D5D]">
                Total <span className="p-5"></span>
              </p>
              <p className="text-lg text-black">6</p>
            </div>
          </div>
          <div className="bg-white border-[2px] w-1/2 border-[#EDEDED] rounded-lg py-3 px-2 flex items-center justify-center gap-4">
            <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-[#52B9FF]">
              <Banknote className="text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-sm text-[#5D5D5D]">Total Money</p>
              <p className="text-lg text-black">$393.33</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full my-6">
        <p className="text-xl font-semibold text-[#484848] w-full my-4">
          Your Deeds
        </p>
        <div className="flex items-center justify-center my-4 w-full text-black gap-2">
          <div className="w-1/4 flex items-center justify-center bg-white border-2 border-gray-400 rounded text-xs px-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <p className="text-[#5D5D5D]">
                    {category ? category : "Category"}
                  </p>
                  {/* If the category is not selected, it'll just display category */}
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuLabel>Dropdown title</DropdownMenuLabel>
                {/* Dropdown title is optional */}
                <DropdownMenuSeparator />
                {/* you can map the DropDownItem component to render the items in the drop down. */}
                <DropdownMenuItem
                  onClick={(e) => {
                    setCategory(e?.currentTarget?.textContent);
                  }}
                >
                  Items
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setCategory(e?.currentTarget?.textContent);
                  }}
                >
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setCategory(e?.currentTarget?.textContent);
                  }}
                >
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setCategory(e?.currentTarget?.textContent);
                  }}
                >
                  Subscription
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-1/4 flex items-center justify-center bg-white border-2 border-gray-400 rounded text-xs px-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <p className="text-[#5D5D5D]">{status ? status : "Status"}</p>
                  <ChevronDown className="text-xs" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* you can map the DropDownItem component to render the items in the drop down. */}
                <DropdownMenuItem
                  onClick={(e) => {
                    setStatus(e?.currentTarget?.textContent);
                  }}
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setStatus(e?.currentTarget?.textContent);
                  }}
                  className="text-wrap"
                >
                  Not Active
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-1/4 flex items-center justify-center bg-white border-2 border-gray-400 rounded text-xs px-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <p className="text-[#5D5D5D]">{role ? role : "Role"}</p>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuLabel>Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* you can map the DropDownItem component to render the items in the drop down. */}
                <DropdownMenuItem
                  onClick={(e) => {
                    setRole(e?.currentTarget?.textContent);
                  }}
                >
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setRole(e?.currentTarget?.textContent);
                  }}
                  className="text-wrap"
                >
                  User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-1/4 flex items-center justify-center bg-white border-2 border-gray-400 rounded text-xs px-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <p className="text-[#5D5D5D]">{date ? date : "Date"}</p>
                  <ChevronDown className="text-xs" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuLabel>Date</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* you can map the DropDownItem component to render the items in the drop down. */}
                <DropdownMenuItem
                  onClick={(e) => {
                    setDate(e?.currentTarget?.textContent);
                  }}
                >
                  3/10/2024
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setDate(e?.currentTarget?.textContent);
                  }}
                  className="text-wrap"
                >
                  4/10/2024
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="w-full mx-6 border-2 border-gray-200 bg-white rounded-lg min-h-[120px] px-4 py-4">
          <div className="flex flex-col">
            {/* Details */}
            <p className="text-[#5D5D5D] text-xs">ID: 3kh4kh21</p>
            <div className="flex gap-1 text-[#262626]">
              <p className="font-bold text-2xl">$</p>
              <p className="font-bold text-2xl">3400</p>
            </div>
            <p className="text-[#5D5D5D]">Django website</p>
          </div>
          <div className="pt-5 flex flex-col gap-y-2">
            {/* Status */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex justify-center items-center bg-[#52B9FF]">
                <Zap className="text-[#FFFFFF]" />
              </div>
              <p>Ongoing</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#C4C4C4] text-sm">
                Last update: A few minutes ago
              </p>
              <Link href="/contract/buyer">
                <Button className="bg-[#52B9FF]">Details</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full z-10 flex flex-row-reverse justify-start items-center min-h-20">
          <div
            className="w-10 h-10 flex justify-center items-center bg-[#52B9FF] rounded-full"
            onClick={() => {
              setDeedPopup(!isDeedPopupOpen);
            }}
          >
            {isDeedPopupOpen ? (
              <X className="text-[#FFFFFF] rotate-90 hover:cursor-pointer" />
            ) : (
              <Plus className="text-[#FFFFFF] hover:cursor-pointer" />
            )}
          </div>
          {isDeedPopupOpen && (
            <div className="z-1 border-2 border-[#EDEDED] rounded-br-none relative right-0 bottom-20 rounded-lg bg-[#FFFFFF] py-2">
              <p className="font-bold text-[#484848] py-1 border-b-2 border-[#EDEDED] w-full p-4">
                New Deed
              </p>

              <Link href="/createDeed/buyer">
                <div className="text-[#484848] flex p-2 items-center gap-2 border-b-2 border-[#EDEDED]">
                  <ShoppingBag className="bg-[#52B9FF] text-[#FFFFFF] p-1 rounded-sm" />
                  <p>{"I'm the buyer"}</p>
                </div>
              </Link>
              <Link href="/createDeed/seller">
                <div className="text-[#484848] flex p-2 items-center gap-2">
                  <Handshake className="bg-[#52B9FF] text-[#FFFFFF] p-1 rounded-sm" />
                  <p>{"I'm the seller"}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
