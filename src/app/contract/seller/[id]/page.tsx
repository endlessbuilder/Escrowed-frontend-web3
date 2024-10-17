'use client';
import { Button } from '@/components/ui/button';
import { Check, Copy, HandCoins, Info, Send } from 'lucide-react';
import report from '@/app/report-icon.png';
import Image from 'next/image';
import ReleaseFunds from '@/components/ReleaseFunds';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Deed, SERVER_IP } from '@/utils/constants';
import { error } from 'console';
import { stat } from 'fs';

export default function DeedDetailsSeller({
  params,
}: {
  params: { id: string };
}) {
  const mileStones = true;
  const deedId = params.id;
  console.log('>>> deed id on seller contract page = ', deedId);

  const [deed, setDeed] = useState<Deed | null>(null);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState<'main' | 'release'>('main');

  // const completed = true;
  // const completedMilestone = true;
  // const approved = false;
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

  useEffect(() => {
    const getDeedInfo = async () => {
      await axios
        .get(`${SERVER_IP}/deed/${params.id}`)
        .then((res) => {
          setDeed(res.data);
          setStatus(res.data.status);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getDeedInfo();
    console.log(`>>> deed info @ contract page : ${deed}`);
    console.log(`>>> status @ contract page : ${status}`);
  }, [params.id, status]);

  return (
    <>
      {currentPage == 'main' &&
        (status == 'pending' ||
          status == 'in_progress' ||
          status == 'completed') && (
          // ---------- Pending or In progress or Completed page ------------------
          <div className='flex h-screen w-screen flex-col items-start justify-start gap-y-5 overflow-x-hidden bg-[#F8F8F8] p-4'>
            <div className='flex flex-col justify-center gap-y-2'>
              {/* Header */}
              <div className='text-sm font-bold text-[#52B9FF]'>
                <p>ID: {deed?.id}</p>
              </div>
              <header className='text-lg font-bold text-[#484848]'>
                <h1>{deed?.title}</h1>
              </header>
              <div className='text-sm text-[#5D5D5D]'>
                <p>
                  {deed?.description}
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
                <p>{deed?.status}</p>
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
                  <p className='text-[#52B9FF]'>{deed?.buyer_id}</p>
                </div>
              </div>
              <div className='bg-[#EDEDED] p-[0.5px]'></div>

              <div className='flex w-full flex-col gap-y-2'>
                <div className='flex w-full justify-between text-[#5D5D5D]'>
                  <p>Deed Seller</p>
                  <p className='text-[#52B9FF]'>You{deed?.seller_id}</p>
                </div>
              </div>
              <div className='bg-[#EDEDED] p-[0.5px]'></div>

              <div className='flex w-full flex-col gap-y-2'>
                <div className='flex w-full justify-between text-[#5D5D5D]'>
                  <p>Payment Distribution Type</p>
                  <p className='text-[#52B9FF]'>{deed?.payment_type}</p>
                </div>
              </div>
              <div className='bg-[#EDEDED] p-[0.5px]'></div>

              <div className='flex w-full flex-col gap-y-2'>
                <div className='flex w-full justify-between text-[#5D5D5D]'>
                  <p>Deed Completion Time</p>
                  <p className='text-[#52B9FF]'>{deed?.timeline}</p>
                </div>
              </div>
              <div className='bg-[#EDEDED] p-[0.5px]'></div>

              <div className='flex w-full flex-col gap-y-2'>
                <div className='flex w-full justify-between text-[#5D5D5D]'>
                  <p>Total Deed Amount</p>
                  <p className='text-[#52B9FF]'>${deed?.amount}</p>
                </div>
              </div>
              <div className='bg-[#EDEDED] p-[0.5px]'></div>

              {/* With milestone */}
              {deed?.payment_type == 'milestone' && (
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
            <div className='flex min-h-[120px] w-full gap-2'>
              {/* Pending - Share, Copy btn */}
              {status == 'pending' && (
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
                      Copy Link
                    </Button>
                  </div>
                </>
              )}
              {/* In progess - Release fund, Report fraud btn */}
              {status == 'in_progress' && (
                <>
                  <div className='w-1/2'>
                    <Button
                      className='flex w-full items-center justify-center gap-2 bg-[#52B9FF]'
                      onClick={() => setCurrentPage('release')}
                    >
                      <HandCoins className='text-sm text-[#FFFFFF]' />
                      Release Funds
                    </Button>
                  </div>
                  <div className='w-1/2'>
                    <Button className='flex w-full items-center justify-center gap-1 border-2 border-[#52B9FF] bg-[#DFEFFF] text-[#52B9FF]'>
                      <Image src={report} alt='report' />
                      Report Fraud
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      {
        // ---------- Relase page ------------------
        currentPage == 'release' && <ReleaseFunds deed={deed} />
      }
    </>
  );
}
