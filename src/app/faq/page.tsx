'use client';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import axios from 'axios';
import { Faqs, SERVER_IP } from '@/utils/constants';

const exampleFaq: Faqs = {
  id: 1,
  question: 'What is the minimum deposit required?',
  answer: 'The minimum deposit required is $100 USDC.',
  status: 'active',
  createdAt: '2024-10-12',
  updatedAt: '2024-10-12',
};

function Faq() {
  const [faqs, setFaqs] = useState([exampleFaq]);

  useEffect(() => {
    const getFaqs = async () => {
      await axios
        .get(`${SERVER_IP}/faq/`)
        .then((response) => {
          setFaqs(response.data);
          console.log(`>>> faqs info @ account page = ${JSON.stringify(faqs)}`);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getFaqs();
    console.log('>>> faqs in FAQs page : ', faqs);
  }, []);

  return (
    <div className='flex h-screen w-screen flex-col gap-y-5 p-10'>
      <header className='flex flex-col gap-y-2'>
        <h1 className='text-lg font-bold text-[#484848]'>
          Frequently Asked Questions
        </h1>
        <p className='text-[#5D5D5D]'>Go through to clear your doubts</p>
      </header>
      <div>
        {/* FAQ's */}
        <Accordion type='single' collapsible className='flex flex-col gap-y-2'>
          {faqs.map((faq) => {
            return (
              <AccordionItem
                key={faq.id}
                value={'item' + faq.id}
                className='rounded-md bg-[#FFFFFF] px-2 hover:cursor-pointer'
              >
                <AccordionTrigger className='text-[#484848]'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-[#5D5D5D]'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <footer className='text-sm text-[#5D5D5D]'>
        You can write us at{' '}
        <a
          href='mailto:contact@escrowed.com'
          className='text-[#52B9FF] underline'
        >
          contact@escrowed.com
        </a>{' '}
        for further inquiry.
      </footer>
    </div>
  );
}

export default Faq;
