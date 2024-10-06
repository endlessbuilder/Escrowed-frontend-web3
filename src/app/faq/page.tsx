import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {
  return (
    <div className="h-screen w-screen flex flex-col p-10 gap-y-5">
      <header className="flex flex-col gap-y-2">
        <h1 className="text-[#484848] text-lg font-bold">
          Frequently Asked Questions
        </h1>
        <p className="text-[#5D5D5D]">Go through to clear your doubts</p>
      </header>
      <div>
        {/* FAQ's */}
        <Accordion type="single" collapsible className="flex flex-col gap-y-2">
          <AccordionItem
            value="item-1"
            className="bg-[#FFFFFF] px-2 rounded-md hover:cursor-pointer"
          >
            <AccordionTrigger className="text-[#484848]">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-[#5D5D5D]">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="bg-[#FFFFFF] px-2 rounded-md hover:cursor-pointer"
          >
            <AccordionTrigger className="text-[#484848]">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-[#5D5D5D]">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="bg-[#FFFFFF] px-2 rounded-md hover:cursor-pointer"
          >
            <AccordionTrigger className="text-[#484848]">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-[#5D5D5D]">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <footer className="text-sm text-[#5D5D5D]">
        You can write us at{" "}
        <a
          href="mailto:contact@escrowed.com"
          className="text-[#52B9FF] underline"
        >
          contact@escrowed.com
        </a>{" "}
        for further inquiry.
      </footer>
    </div>
  );
}

export default Faq;
