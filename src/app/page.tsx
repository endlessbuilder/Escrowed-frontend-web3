'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { Deed, SERVER_IP, User } from '@/utils/constants';

const user: User = {
  id: 0,
  first_name: 'first_name',
  last_name: 'first_name',
  email: 'email',
};
const deed: Deed = {
  id: 0,
  title: 'title',
  description: 'description',
  payment_method: null,
  payment_type: null,
  amount: 0,
  timeline: 0,
  status: 'pending',
  buyer_id: 0,
  seller_id: 0,
  category: 'category',
  createdAt: null,
};

export default function Home() {
  const [userInfo, setUserInfo] = useState(user);
  const [deeds, setDeeds] = useState<(Deed | null)[]>([]);
  const [filteredDeeds, setFilteredDeeds] = useState<(Deed | null)[]>([]);

  const [category, setCategory] = useState<string | null>('');
  const [status, setStatus] = useState<string | null>('');
  const [role, setRole] = useState<string | null>('');
  const [date, setDate] = useState<string | null>('');
  const [isDeedPopupOpen, setDeedPopup] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      await axios
        .get(`${SERVER_IP}/user/${2}`)
        .then((response) => {
          setUserInfo(response.data);
          console.log(
            `>>> user info @ home page = ${JSON.stringify(userInfo)}`
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getDeedsByUser = async () => {
      await axios
        .get(`${SERVER_IP}/deed/byuser/${2}`)
        .then((response) => {
          setDeeds(response.data);
          console.log(`>>> deeds @ home page = ${JSON.stringify(deeds)}`);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getUserInfo();
    getDeedsByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filter = () => {
      console.log(`>>> selected category in filter = ${category}`);
      console.log(`>>> selected status in filter = ${status}`);
      console.log(`>>> selected role in filter = ${role}`);
      console.log(`>>> selected date in filter = ${date}`);

      const filteredDeeds = deeds.filter((value) => {
        let flagCategory = false;
        let flagStatus = false;
        // let flagRole = false;
        let flagDate = false;

        if (category === null || category === '' || category === undefined)
          flagCategory = true;
        else if (value?.category == category) flagCategory = true;
        if (status === null || status === '' || status === undefined)
          flagStatus = true;
        else {
          if (status == 'Active' && value?.status != 'cancelled')
            flagStatus = true;
          if (status == 'Not Active' && value?.status == 'cancelled')
            flagStatus = true;
        }
        // if ( role === null || role === null '' || role === null undefined) flagRole = true;
        // else if (value.role == role) flagStatus = true;
        if (date === null || date === '' || date === undefined) flagDate = true;
        else if (new Date(value?.createdAt).toISOString().slice(0, 10) == date)
          flagDate = true;

        return flagCategory && flagStatus && flagDate;
      });

      setFilteredDeeds(filteredDeeds);
      console.log(`>>> filtered deeds = ${JSON.stringify(filteredDeeds)}`);
    };

    filter();
  }, [deeds, category, date, status, role]);

  const getActiveNum = useCallback(() => {
    return deeds.filter(
      (value) => value?.status != 'completed' && value?.status != 'cancelled'
    ).length;
  }, [deeds]);
  const getCompletedNum = useCallback(() => {
    return deeds.filter((value) => value?.status == 'completed').length;
  }, [deeds]);

  return (
    <div className='flex h-screen w-screen flex-col items-start justify-start overflow-x-hidden bg-gray-200 p-6'>
      <div className='mb-8 mt-4 flex w-full items-center justify-between'>
        <div className='flex items-center justify-center gap-4'>
          <div className=''>
            <Avatar className='h-14 w-14'>
              <AvatarImage
                className='h-24 w-24 object-cover'
                src='https://s3-alpha-sig.figma.com/img/206f/7d73/ad181b17fcb71bebb0d89e011174038c?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IHiojlzSMpKk~zY-VGfNozCna4~xIEARzNb9Bx6llJOGjkGGi--H0dbPXKLAhN1DOBdd~-1PfoWyu4VMgg3UDjwD0Kha~7ffBrMbFFtpVuYO~rsZRdMVoLXXDKAuylYW-B3-3L-S1YHM9K4toHaRxAaVWFOfQ~orJ4ohSCwcJO-10Q6vGMG1z2qLbrVR-6D8RMUPT2x5tD4djFYF5YCXyXVtpoZGULSYZ78w7YArc49FnZNJnDZq8pdwoEDcBSbWwUC8jz7TevxPGuZDjxEwp0XT-UsuAKU8cxsMp~Pttz-wmHBQdnHVg5lTaenxuPA5tbD12GMrDxSCEfUHMq-GUg__'
              />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className='text-lg text-gray-400'>Hello,</p>
            <p className='text-lg text-black'>
              {userInfo.first_name} {userInfo.last_name}
            </p>
          </div>
        </div>
        <Link href='/notifications'>
          <div className='flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-full bg-[#FFFFFF] p-2'>
            <div className='flex w-full justify-end'>
              <div className='h-2 w-2 items-start rounded-full bg-[#52B9FF]'></div>
            </div>
            <Bell className='h-full w-full' />
          </div>
        </Link>
      </div>
      <p className='my-6 w-full text-left text-xl font-semibold text-[#484848]'>
        Your Activity
      </p>
      <div className='my-4 flex w-full flex-col items-center justify-center gap-4'>
        <div className='flex w-full items-center justify-center gap-4'>
          <div className='flex w-1/2 items-center justify-center gap-4 rounded-lg border-[2px] border-[#EDEDED] bg-white px-2 py-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#52B9FF]'>
              <Zap className='text-[#FFFFFF]' />
            </div>
            <div>
              <p className='text-xs text-[#5D5D5D]'>Active Deeds</p>
              <p className='text-lg text-black'>{getActiveNum()}</p>
            </div>
          </div>
          <div className='flex w-1/2 items-center justify-center gap-4 rounded-lg border-[2px] border-[#EDEDED] bg-white px-2 py-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#52B9FF]'>
              <CheckCheck className='text-[#FFFFFF]' />
            </div>
            <div>
              <p className='text-sm text-[#5D5D5D]'>Completed</p>
              <p className='text-lg text-black'>{getCompletedNum()}</p>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-center gap-4'>
          <div className='flex w-1/2 items-center justify-center gap-4 rounded-lg border-[2px] border-[#EDEDED] bg-white px-2 py-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#52B9FF]'>
              <BriefcaseBusiness className='text-[#FFFFFF]' />
            </div>
            <div>
              <p className='text-sm text-[#5D5D5D]'>
                Total <span className='p-5'></span>
              </p>
              <p className='text-lg text-black'>{deeds.length}</p>
            </div>
          </div>
          <div className='flex w-1/2 items-center justify-center gap-4 rounded-lg border-[2px] border-[#EDEDED] bg-white px-2 py-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#52B9FF]'>
              <Banknote className='text-[#FFFFFF]' />
            </div>
            <div>
              <p className='text-sm text-[#5D5D5D]'>Total Money</p>
              <p className='text-lg text-black'>$393.33</p>
            </div>
          </div>
        </div>
      </div>
      <div className='my-6 flex w-full flex-col items-center justify-center'>
        <p className='my-4 w-full text-xl font-semibold text-[#484848]'>
          Your Deeds
        </p>
        <div className='my-4 flex w-full items-center justify-center gap-2 text-black'>
          <div className='flex w-1/4 items-center justify-center rounded border-2 border-gray-400 bg-white px-1 text-xs'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center justify-center'>
                  <p className='text-[#5D5D5D]'>
                    {category ? category : 'Category'}
                  </p>
                  {/* If the category is not selected, it'll just display category */}
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
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
          <div className='flex w-1/4 items-center justify-center rounded border-2 border-gray-400 bg-white px-1 text-xs'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center justify-center'>
                  <p className='text-[#5D5D5D]'>{status ? status : 'Status'}</p>
                  <ChevronDown className='text-xs' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
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
                  className='text-wrap'
                >
                  Not Active
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex w-1/4 items-center justify-center rounded border-2 border-gray-400 bg-white px-1 text-xs'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center justify-center'>
                  <p className='text-[#5D5D5D]'>{role ? role : 'Role'}</p>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
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
                  className='text-wrap'
                >
                  User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex w-1/4 items-center justify-center rounded border-2 border-gray-400 bg-white px-1 text-xs'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='flex items-center justify-center'>
                  <p className='text-[#5D5D5D]'>{date ? date : 'Date'}</p>
                  <ChevronDown className='text-xs' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
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
                  className='text-wrap'
                >
                  4/10/2024
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {filteredDeeds.map((deed) => (
          <div
            className='mx-6 min-h-[120px] w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-4'
            key={'deed' + deed?.id}
          >
            <div className='flex flex-col'>
              {/* Details */}
              <p className='text-xs text-[#5D5D5D]'>ID: {deed?.id}</p>
              <div className='flex gap-1 text-[#262626]'>
                <p className='text-2xl font-bold'>$</p>
                <p className='text-2xl font-bold'>{deed?.amount}</p>
              </div>
              <p className='text-[#5D5D5D]'>{deed?.title}</p>
            </div>
            <div className='flex flex-col gap-y-2 pt-5'>
              {/* Status */}
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#52B9FF]'>
                  <Zap className='text-[#FFFFFF]' />
                </div>
                <p>{deed?.status}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-[#C4C4C4]'>
                  Last update: {deed?.createdAt}
                </p>
                {deed?.buyer_id.toString() === userInfo.id.toString() && (
                  <Link href={`/contract/buyer/${deed?.id}`}>
                    <Button className='bg-[#52B9FF]'>Details</Button>
                  </Link>
                )}
                {deed?.seller_id.toString() === userInfo.id.toString() && (
                  <Link href={`/contract/seller/${deed?.id}`}>
                    <Button className='bg-[#52B9FF]'>Details</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className='z-10 flex min-h-20 w-full flex-row-reverse items-center justify-start'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-full bg-[#52B9FF]'
            onClick={() => {
              setDeedPopup(!isDeedPopupOpen);
            }}
          >
            {isDeedPopupOpen ? (
              <X className='rotate-90 text-[#FFFFFF] hover:cursor-pointer' />
            ) : (
              <Plus className='text-[#FFFFFF] hover:cursor-pointer' />
            )}
          </div>
          {isDeedPopupOpen && (
            <div className='z-1 relative bottom-20 right-0 rounded-lg rounded-br-none border-2 border-[#EDEDED] bg-[#FFFFFF] py-2'>
              <p className='w-full border-b-2 border-[#EDEDED] p-4 py-1 font-bold text-[#484848]'>
                New Deed
              </p>

              <Link href='/createDeed/buyer'>
                <div className='flex items-center gap-2 border-b-2 border-[#EDEDED] p-2 text-[#484848]'>
                  <ShoppingBag className='rounded-sm bg-[#52B9FF] p-1 text-[#FFFFFF]' />
                  <p>{"I'm the buyer"}</p>
                </div>
              </Link>
              <Link href='/createDeed/seller'>
                <div className='flex items-center gap-2 p-2 text-[#484848]'>
                  <Handshake className='rounded-sm bg-[#52B9FF] p-1 text-[#FFFFFF]' />
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
