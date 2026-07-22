import { AlertTriangle } from "lucide-react";

const problems = [
  "Job cards get lost. Invoices take too long. Nobody has clean numbers on what a job actually cost vs. what it billed.",
  "Customers ghost on estimates, no-show appointments, and you don't find out they left until they're already gone.",
  "Every \u201Call-in-one\u201D shop platform either costs more than it should, or hides the features you actually need behind a second, pricier plan.",
];

const ProblemSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
            Still running your shop on paper, spreadsheets, and memory?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((text, i) => (
            <div
              key={i}
              className="rounded-xl border border-mint-100 bg-mint-50/40 p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-mint-200 flex items-center justify-center text-mint-700">
                <AlertTriangle size={18} />
              </div>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;