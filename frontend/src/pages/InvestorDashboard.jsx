import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

function InvestorDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Investor Dashboard</h2>
      <p className="mb-6">Here you will see pitches to review and analytics.</p>

      {/* 🔹 FAQ Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I review pitches?</AccordionTrigger>
          <AccordionContent>
            Select a pitch from your dashboard, read the details, and leave your review or decision.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Can I collaborate with entrepreneurs?</AccordionTrigger>
          <AccordionContent>
            Yes, you can message entrepreneurs directly to discuss partnerships and opportunities.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Do I see AI analysis too?</AccordionTrigger>
          <AccordionContent>
            Yes, AI-generated insights are shown alongside each pitch to help with evaluation.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default InvestorDashboard;

  