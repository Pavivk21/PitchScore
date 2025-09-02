import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

function EntrepreneurDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Entrepreneur Dashboard</h2>
      <p className="mb-6">Here you will see your submitted pitches and AI feedback.</p>

      {/* 🔹 FAQ Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I submit a pitch?</AccordionTrigger>
          <AccordionContent>
            Go to the <strong>Submit Pitch</strong> page, fill in your pitch details, and click submit.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does AI feedback work?</AccordionTrigger>
          <AccordionContent>
            Once your pitch is submitted, the AI analyzes it for clarity, feasibility, and market potential.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I edit my pitch after submission?</AccordionTrigger>
          <AccordionContent>
            Yes, you can update your pitch from the dashboard before investors review it.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default EntrepreneurDashboard;

  