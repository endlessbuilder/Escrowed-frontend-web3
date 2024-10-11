'use client';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck, Copy, HandCoins, Info, Send } from 'lucide-react';
import report from '@/app/report-icon.png';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import RequestFunds from '@/components/RequestFunds';
import SellerApplication from '@/components/SellerApplication';
// import web3 from '@/utils/web3';
// import escrowed from '@/utils/escrowed';

export default function DeedDetailsBuyer({
  params,
}: {
  params: { id: string };
}) {

  const mileStones = false;
  const completed = false;
  const completedMilestone = true;
  const approved = true;

  const deedId = params.id;
  console.log('>>> deed id on buyer contract page = ', deedId);

  const [mileStonesObj, setMileStonesObj] = useState([
    {
      id: 0,
      milestone: 'Userflow & designing',
      amount: '1200',
      expectedTime: '1week',
      isCompleted: true,
    },
    {
      id: 1,
      milestone: 'Frontend Development',
      amount: '1200',
      expectedTime: '3weeks',
      isCompleted: false,
    },
    {
      id: 2,
      milestone: 'Backend development & smart contract',
      amount: '1200',
      expectedTime: '4weeks',
      isCompleted: false,
    },
  ]);
  const paymentPending = false;

  return !approved ? (
    <div className='flex h-screen w-screen flex-col items-start justify-start gap-y-5 overflow-x-hidden bg-[#F8F8F8] p-4'>
      <div className='flex flex-col justify-center gap-y-2'>
        {/* Header */}
        <div className='text-sm font-bold text-[#52B9FF]'>
          <p>ID: 3kh4kh21</p>
        </div>
        <header className='text-lg font-bold text-[#484848]'>
          <h1>Escrowed Telegram Mini App</h1>
        </header>
        <div className='text-sm text-[#5D5D5D]'>
          <p>
            This will be a simple escrow app made for telegram app store. This
            will allow users to create escrow...{' '}
            <span className='text-[#52B9FF] underline'>Read more</span>
          </p>
        </div>
      </div>
      <div className='flex w-full items-center justify-between rounded-md bg-[#DFEFFF] p-2'>
        <div className='flex items-center justify-center gap-2 text-xs'>
          <Info className='text-[#52B9FF]' />
          <p className='font-bold text-[#5D5D5D]'>Project Status</p>
        </div>
        <div className='text-xs text-[#5D5D5D]'>
          {paymentPending ? (
            <p>Payment Pending</p>
          ) : (
            <p>{completed ? 'Completed' : 'Ongoing'}</p>
          )}
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-3'>
        {/* Deed Details */}
        <div>
          <h1 className='font-bold text-[#484848]'>Deed Info Summary</h1>
        </div>
        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex w-full justify-between text-[#5D5D5D]'>
            <p>Deed Buyer</p>
            <p className='text-[#52B9FF]'>You(34 Plebi)</p>
          </div>
        </div>
        <div className='bg-[#EDEDED] p-[0.5px]'></div>

        {!paymentPending && (
          <>
            <div className='flex w-full flex-col gap-y-2'>
              <div className='flex w-full justify-between text-[#5D5D5D]'>
                <p>Deed Seller</p>
                <p className='text-[#52B9FF]'>bas3kkk</p>
              </div>
            </div>
            <div className='bg-[#EDEDED] p-[0.5px]'></div>
          </>
        )}

        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex w-full justify-between text-[#5D5D5D]'>
            <p>Payment Distribution Type</p>
            <p className='text-[#52B9FF]'>One Time</p>
          </div>
        </div>
        <div className='bg-[#EDEDED] p-[0.5px]'></div>

        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex w-full justify-between text-[#5D5D5D]'>
            <p>Deed Completion Time</p>
            <p className='text-[#52B9FF]'>4.5 weeks</p>
          </div>
        </div>
        <div className='bg-[#EDEDED] p-[0.5px]'></div>

        <div className='flex w-full flex-col gap-y-2'>
          <div className='flex w-full justify-between text-[#5D5D5D]'>
            <p>Total Deed Amount</p>
            <p className='text-[#52B9FF]'>$1200</p>
          </div>
        </div>
        <div className='bg-[#EDEDED] p-[0.5px]'></div>
        {mileStones && (
          <div className='flex w-full flex-col gap-y-3 py-2'>
            {/* Deed Details */}
            <div>
              <h1 className='font-bold text-[#484848]'>Milestones</h1>
            </div>
            {mileStonesObj.map((val, index) => {
              return (
                <div key={'mileStonesObj' + index}>
                  <div className='flex w-full flex-col gap-y-2'>
                    <div className='flex w-full justify-between text-[#5D5D5D]'>
                      <div className='flex items-center justify-center gap-2'>
                        <p>{val.milestone}</p>
                        {val?.isCompleted && (
                          <Check className='h-3 w-3 rounded-full bg-[#52B9FF] text-[#FFFFFF]' />
                        )}
                      </div>
                      <p className='text-[#52B9FF]'>
                        ${val?.amount}({val?.expectedTime})
                      </p>
                    </div>
                  </div>
                  <div className='bg-[#EDEDED] p-[0.5px]'></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className='flex w-full flex-col gap-y-3'>
        <div className='flex w-full flex-col gap-y-2'>
          <h1 className='text-lg font-bold text-[#484848]'>
            Seller Applications
          </h1>
          <p className='text-sm text-[#484848]'>
            Select the seller for this contract
          </p>
        </div>
        <div className='flex w-full flex-col gap-y-2'>
          <SellerApplication seller='Hxweasdf22' time='25 min ago' />
          <SellerApplication seller='Hxweasdf22' time='25 min ago' />
          <SellerApplication seller='Hxweasdf22' time='25 min ago' />
          <Button className='flex w-full items-center justify-center gap-2 border-2 border-[#EDEDED] bg-[#FFFFFF] text-[#000000]'>
            <CheckCheck /> Select Seller
          </Button>
        </div>
      </div>
      <div className='flex min-h-[120px] w-full gap-2'>
        {/* Share */}
        {paymentPending ? (
          <>
            <div className='w-1/2'>
              <Button className='flex w-full items-center justify-center gap-2 bg-[#52B9FF] hover:bg-[#52B9FF]'>
                <Send className='text-sm text-[#FFFFFF]' />
                Share
              </Button>
            </div>
            <div className='w-1/2'>
              <Button className='flex w-full items-center justify-center gap-2 border-2 border-[#52B9FF] bg-[#DFEFFF] text-[#52B9FF] hover:bg-[#DFEFFF] hover:text-[#52B9FF]'>
                <Copy className='text-[#52B9FF]' />
                Copy
              </Button>
            </div>
          </>
        ) : (
          !completed && (
            <>
              <div className='w-1/2'>
                <Button className='flex w-full items-center justify-center gap-2 bg-[#52B9FF]'>
                  <HandCoins className='text-sm text-[#FFFFFF]' />
                  Request Funds
                </Button>
              </div>
              <div className='w-1/2'>
                <Button className='flex w-full items-center justify-center gap-1 border-2 border-[#52B9FF] bg-[#DFEFFF] text-[#52B9FF]'>
                  <Image src={report} alt='report' />
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
