'use client';

import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import Milestones from './Milestones';
import { Upload, XIcon } from 'lucide-react';

import web3 from '@/utils/web3';
import escrowed from '@/utils/escrowed';

function RequestFunds() {
  const [projectLink, setProjectLink] = useState('');
  const [mileStonesObj, setMileStonesObj] = useState([
    {
      id: 0,
      milestone: 'Userflow & designing',
      amount: '1200',
      expectedTime: '',
    },
    {
      id: 1,
      milestone: 'Frontend Development',
      amount: '1200',
      expectedTime: '',
    },
    {
      id: 2,
      milestone: 'Backend development & smart contract',
      amount: '1200',
      expectedTime: '',
    },
  ]);
  const mileStones = true;
  const radioRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickRequestFunds = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`>>> accounts = ${accounts}`);
    try {
      await escrowed.methods
        .markMilestoneAsDoneBySupplier(accounts[0], 2)
        .send({
          from: accounts[0],
        });
      alert('markMilestoneAsDoneBySupplier successfully!');
    } catch (error) {
      console.error('Error markMilestoneAsDoneBySupplier:', error);
      alert('Failed to markMilestoneAsDoneBySupplier');
    }
  };

  return (
    <div className='flex h-screen w-screen flex-col items-start justify-start gap-y-8 overflow-x-hidden bg-[#F8F8F8] p-4'>
      <div className='flex flex-col justify-center gap-y-2'>
        {/* Header */}
        <header className='text-lg font-bold text-[#484848]'>
          <h1>Request Funds</h1>
        </header>
      </div>
      <div className='flex w-full flex-col gap-y-3'>
        <div>
          <h1 className='font-bold text-[#484848]'>Request Funds for</h1>
        </div>
        {!mileStones && (
          <div className='flex w-full flex-col gap-y-2'>
            <div
              className='flex w-full justify-between text-[#5D5D5D]'
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
              <div className='flex items-center justify-center gap-1'>
                <input
                  type='radio'
                  className='border-2 border-[#52B9FF] bg-[#52B9FF] outline-none'
                  ref={radioRef}
                />
                <label>Complete Project</label>
              </div>
              <p className='text-[#52B9FF]'>$1200</p>
            </div>
          </div>
        )}
        {mileStones &&
          mileStonesObj.map((val, index) => {
            return (
              <Milestones
                milestone={val?.milestone}
                amount={val?.amount}
                key={'mileStonesObj' + index}
              />
            );
          })}
      </div>
      <div className='flex w-full flex-col gap-y-2'>
        <div>
          <h1>Proof of work (Optional)</h1>
        </div>
        <div>
          <p>
            It’s recommended to upload work proofs for your contract. It will be
            very helpful in case of any fraud.
          </p>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-y-2'>
          <div className='flex w-full items-center justify-center rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2'>
            <input
              type='text'
              className='w-full rounded-md outline-none'
              placeholder='Project Link'
              onChange={(e) => setProjectLink(e.target.value)}
              value={projectLink}
            />
            <div
              onClick={() => {
                setProjectLink('');
              }}
            >
              <XIcon className='h-5 w-5 text-[#5D5D5D]' />
            </div>
          </div>
          <p className='text-[#C4C4C4]'>Or</p>
          <div
            className='flex min-h-[120px] w-full flex-col items-center justify-center gap-y-2 rounded-md border-2 border-[#C4C4C4] text-[#C4C4C4]'
            onClick={() => {
              fileRef?.current?.click();
            }}
          >
            <Upload />
            <p>Select a file to upload</p>
            <input type='file' ref={fileRef} className='hidden' />
          </div>
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
      </div>
      <div className='flex min-h-[120px] w-full gap-2'>
        {/* Share */}
        <div className='w-full'>
          <Button
            className='flex w-full items-center justify-center gap-2 bg-[#52B9FF]'
            onClick={() => onClickRequestFunds()}
          >
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
