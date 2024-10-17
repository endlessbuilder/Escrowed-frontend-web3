'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';

import web3 from '@/utils/web3';
import escrowed from '@/utils/escrowed';
import { SERVER_IP, USDC } from '@/utils/constants';
import { EventLog } from 'web3';
import axios from 'axios';

function CreateFee() {
  const [deed, setDeed] = useState('');
  const [isOneTime, setIsOneTime] = useState(true);
  const [modeOfPayment, setModeOfPayment] = useState<string | null>('');
  const [expectedTimeOfCompletion, setExpectedTimeOfCompletion] = useState<
    string[]
  >([]);
  const [isDeedSaved, setIsDeedSaved] = useState(false);
  const [description, setDescription] = useState('');
  const [mileStones, setMileStones] = useState([
    { id: 0, milestone: '', amount: '0', expectedTime: '' },
  ]);

  function addMilestone() {
    setMileStones((prev) => [
      ...prev,
      { id: prev.length, milestone: '', amount: '0', expectedTime: '' },
    ]);
  }

  function filterFn(value: any, index: number, array: any) {
    return value.amount;
  }

  const getMilstoneFunds = () => {
    const filtered = mileStones.map(filterFn);
    while (filtered.length < 10) {
      filtered.push(0);
    }
    return filtered;
  };

  const saveDeed = async () => {
    setIsDeedSaved(true);
    const accounts = await web3.eth.getAccounts();
    console.log(`>>> accounts = ${accounts}`);
    console.log(`>>> mileStoneFunds = ${getMilstoneFunds()}`);

    async function fetchEvents() {
      let jobCount = 0;
      try {
        const events: (string | EventLog)[] = await escrowed.getPastEvents(
          'JobCreated',
          {
            fromBlock: 0, // You can specify a block range here
            toBlock: 'latest', // To the latest block
          }
        );
        console.log(
          '>>> events : ',
          (events as EventLog[]).slice(-1)[0].returnValues.jobCount
        );
        jobCount = parseInt(
          (
            (events as EventLog[]).slice(-1)[0].returnValues.jobCount as string
          ).toString()
        );
      } catch (error) {
        console.error('>>> Error fetching events:', error);
      }
      return jobCount;
    }

    try {
      await escrowed.methods
        .createJob(accounts[0], USDC, mileStones.length, getMilstoneFunds())
        .send({
          from: accounts[0],
        });
      alert('Job created successfully!');
      const jobCount = await fetchEvents();
      console.log(`>>> Job Count : ${jobCount}`);
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job');
    }

    const body = {
      user_id: 1,
      title: deed,
      description: description,
      payment_method: modeOfPayment,
      payment_type: isOneTime ? 'one_time' : 'milestone',
      milestones: mileStones,
      buy_sell_type: 'BUY',
    };

    await axios.post(`${SERVER_IP}/deed/create`, body).catch((error) => {
      console.log('Error creating', error);
    });
  };

  return (
    <div className='flex h-screen w-screen flex-col items-start justify-start gap-y-5 overflow-x-hidden bg-[#F8F8F8] p-6'>
      <header className='text-lg font-bold text-[#484848]'>
        <h1>Create a Deed</h1>
      </header>
      <div className='flex w-full flex-col justify-center gap-y-3'>
        {/* deed form  */}
        <div className='text-[#5D5D5D]'>
          <p>What your deed is about?</p>
        </div>
        <div className='flex w-full items-center justify-center rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2'>
          <input
            type='text'
            className='w-full rounded-md outline-none'
            placeholder='Title'
            onChange={(e) => setDeed(e.target.value)}
            value={deed}
          />
          <div
            onClick={() => {
              setDeed('');
            }}
          >
            <XIcon className='h-5 w-5 text-[#5D5D5D]' />
          </div>
        </div>
        <div>
          <textarea
            className='w-full rounded-md border-2 border-[#C4C4C4] p-2 outline-none'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-2'>
        <div className='text-[#5D5D5D]'>
          <p>How the payment will be distributed?</p>
        </div>
        <div className='flex w-full items-center justify-center gap-2'>
          <Button
            className={
              isOneTime
                ? `w-1/2 border-2 border-[#52B9FF] bg-[#DFEFFF] text-[#52B9FF] hover:border-[#52B9FF] hover:bg-[#DFEFFF] hover:text-[#52B9FF]`
                : `w-1/2 border-2 border-[#52B9FF] bg-[#FFFFFF] text-[#52B9FF] hover:border-[#52B9FF] hover:bg-[#DFEFFF] hover:text-[#52B9FF]`
            }
            onClick={() => setIsOneTime(true)}
          >
            One Time
          </Button>
          <Button
            className={
              !isOneTime
                ? `w-1/2 border-2 border-[#52B9FF] bg-[#DFEFFF] text-[#52B9FF] hover:border-[#52B9FF] hover:bg-[#DFEFFF] hover:text-[#52B9FF]`
                : `w-1/2 border-2 border-[#52B9FF] bg-[#FFFFFF] text-[#52B9FF] hover:border-[#52B9FF] hover:bg-[#DFEFFF] hover:text-[#52B9FF]`
            }
            onClick={() => setIsOneTime(false)}
          >
            Milestones
          </Button>
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-2'>
        <div className='text-[#5D5D5D]'>
          <p>Further Details about the deed</p>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-y-2'>
          <div className='w-full rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2'>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex w-full items-center justify-center'>
                {modeOfPayment ? (
                  <div className='flex w-[80%] items-center justify-start text-sm text-black'>
                    <p>{modeOfPayment}</p>
                  </div>
                ) : (
                  <div className='flex w-[80%] items-center justify-start text-sm text-[#C4C4C4]'>
                    <p>Mode Of Payment</p>
                  </div>
                )}
                <div className='flex w-[20%] items-center justify-end'>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-full'>
                <DropdownMenuItem
                  onClick={(e) => {
                    setModeOfPayment(e?.currentTarget?.textContent);
                  }}
                >
                  UPI
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setModeOfPayment(e?.currentTarget?.textContent);
                  }}
                >
                  Crypto
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setModeOfPayment(e?.currentTarget?.textContent);
                  }}
                >
                  Net Banking
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    setModeOfPayment(e?.currentTarget?.textContent);
                  }}
                >
                  Etc
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {!isOneTime &&
            mileStones.map((val) => (
              <div className='flex w-full flex-col gap-y-2' key={val?.id}>
                <div className='flex w-full items-center rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2'>
                  <input
                    type='text'
                    className='w-full rounded-md text-sm text-[#C4C4C4] outline-none'
                    placeholder='Milestone'
                    onChange={(e) => {
                      setMileStones((prev) => {
                        const newMilestones = [...prev];
                        newMilestones[val.id].milestone = e.target.value;
                        return newMilestones;
                      });
                    }}
                  />
                </div>
                <div className='flex w-full items-center justify-between rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2'>
                  <input
                    type='text'
                    className='rounded-md text-sm text-[#C4C4C4] outline-none'
                    placeholder='Amount'
                    onChange={(e) => {
                      setMileStones((prev) => {
                        const newMilestones = [...prev];
                        newMilestones[val.id].amount = e.target.value;
                        return newMilestones;
                      });
                    }}
                  />
                  <p className='text-bold text-sm text-[#5D5D5D]'>(USDT)</p>
                </div>
                <div className='w-full rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2 px-1'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex w-full items-center justify-center'>
                      {mileStones[val.id].expectedTime !== '' ? (
                        <div className='flex w-[80%] items-center justify-start text-sm text-black'>
                          <p>{mileStones[val.id].expectedTime}</p>
                        </div>
                      ) : (
                        <div className='flex w-[80%] items-center justify-start text-sm text-[#C4C4C4]'>
                          <p>Expected Time of Completion</p>
                        </div>
                      )}
                      <div className='flex w-[20%] items-center justify-end'>
                        <ChevronDown />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full'>
                      {/* Map here */}
                      <DropdownMenuItem
                        onClick={(e) => {
                          setMileStones((prev) => {
                            const newMilestones = [...prev];
                            newMilestones[val.id].expectedTime =
                              e.currentTarget.textContent || '';
                            return newMilestones;
                          });
                        }}
                      >
                        1 week
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          setMileStones((prev) => {
                            const newMilestones = [...prev];
                            newMilestones[val.id].expectedTime =
                              e.currentTarget.textContent || '';
                            return newMilestones;
                          });
                        }}
                      >
                        2 weeks
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          setMileStones((prev) => {
                            const newMilestones = [...prev];
                            newMilestones[val.id].expectedTime =
                              e.currentTarget.textContent || '';
                            return newMilestones;
                          });
                        }}
                      >
                        3 weeks
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          setMileStones((prev) => {
                            const newMilestones = [...prev];
                            newMilestones[val.id].expectedTime =
                              e.currentTarget.textContent || '';
                            return newMilestones;
                          });
                        }}
                      >
                        4 weeks
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          {isOneTime && (
            <>
              <div className='flex w-full items-center justify-between rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2'>
                <input
                  type='text'
                  className='rounded-md text-sm text-[#C4C4C4] outline-none'
                  placeholder='Amount'
                  onChange={(e) => {
                    setMileStones((prev) => {
                      const newMilestones = [...prev];
                      newMilestones[0].amount = e.target.value;
                      return newMilestones;
                    });
                  }}
                />
                <p className='text-bold text-sm text-[#5D5D5D]'>(USDT)</p>
              </div>
              <div className='w-full rounded-md border-2 border-[#C4C4C4] bg-[#FFFFFF] p-2 px-1'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex w-full items-center justify-center'>
                    {mileStones[0].expectedTime !== '' ? (
                      <div className='flex w-[80%] items-center justify-start text-sm text-black'>
                        <p>{mileStones[0].expectedTime}</p>
                      </div>
                    ) : (
                      <div className='flex w-[80%] items-center justify-start text-sm text-[#C4C4C4]'>
                        <p>Expected Time of Completion</p>
                      </div>
                    )}
                    <div className='flex w-[20%] items-center justify-end'>
                      <ChevronDown />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className='w-full'
                    onChange={(e) => {
                      setMileStones((prev) => {
                        const newMilestones = [...prev];
                        newMilestones[0].expectedTime =
                          e.currentTarget.textContent || '';
                        return newMilestones;
                      });
                    }}
                  >
                    {/* Map here */}
                    <DropdownMenuItem
                      onClick={(e) => {
                        setMileStones((prev) => {
                          const newMilestones = [...prev];
                          newMilestones[0].expectedTime =
                            e.currentTarget.textContent || '';
                          return newMilestones;
                        });
                      }}
                    >
                      1week
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        setMileStones((prev) => {
                          const newMilestones = [...prev];
                          newMilestones[0].expectedTime =
                            e.currentTarget.textContent || '';
                          return newMilestones;
                        });
                      }}
                    >
                      2weeks
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        setMileStones((prev) => {
                          const newMilestones = [...prev];
                          newMilestones[0].expectedTime =
                            e.currentTarget.textContent || '';
                          return newMilestones;
                        });
                      }}
                    >
                      3weeks
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        setMileStones((prev) => {
                          const newMilestones = [...prev];
                          newMilestones[0].expectedTime =
                            e.currentTarget.textContent || '';
                          return newMilestones;
                        });
                      }}
                    >
                      4weeks
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
        {!isOneTime && (
          <div className='flex w-full items-center justify-center'>
            <Button
              className='flex w-full items-center justify-center gap-2 border-2 border-[#EDEDED] bg-[#FFFFFF] text-black hover:bg-white'
              onClick={addMilestone}
            >
              <p className='text-[#5D5D5D]'>Add Another Milestone</p>
              <PlusIcon className='h-4 w-4 text-[#5D5D5D]' />
            </Button>
          </div>
        )}
      </div>
      <div className='min-h-[120px] w-full'>
        {/* Save deed */}
        <Button
          className='w-full bg-[#52B9FF] text-[#FFFFFF]'
          onClick={() => {
            saveDeed();
          }}
        >
          Save Deed
        </Button>
      </div>
    </div>
  );
}

export default CreateFee;
