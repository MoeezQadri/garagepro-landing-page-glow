import { ClipboardList, FileText, Timer, Boxes, BellRing, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Digital Job Board",
    body: "See every vehicle's status — waiting, in progress, ready for pickup — at a glance. No more walking the bay to find out where a job stands.",
  },
  {
    icon: FileText,
    title: "Estimate-to-Invoice Workflow",
    body: "Build an estimate, get it approved, and turn it into an invoice with one click. The job, the estimate, and the bill are the same record — nothing gets re-typed or lost in translation.",
  },
  {
    icon: Timer,
    title: "Technician Performance Tracking",
    body: "See actual time spent against estimated time, per job and per technician. Catch jobs that are running long before it becomes a pattern that eats your margin.",
  },
  {
    icon: Boxes,
    title: "Inventory & Parts Tracking",
    body: "Log parts as they're used and watch stock counts update in real time — not reconciled once a month when it's too late to reorder.",
  },
  {
    icon: BellRing,
    title: "Automated Reminders & Follow-Up",
    tag: "Professional & Enterprise",
    body: "Time- and mileage-based reminders go out on their own, so a customer's next service doesn't depend on someone remembering to call them.",
  },
  {
    icon: BarChart3,
    title: "Reporting You Can Actually Use",
    body: "Income vs. expense, at a glance — not buried in a spreadsheet you have to build yourself every month.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
            Everything a shop actually uses, in one place.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body, tag }) => (
            <div
              key={title}
              className="rounded-xl border border-mint-100 bg-white p-6 hover:border-mint-300 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-mint-100 flex items-center justify-center text-mint-700 mb-4">
                <Icon size={20} />
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-mint-950">{title}</h3>
              </div>
              {tag && (
                <span className="inline-block text-[11px] font-medium uppercase tracking-wide text-mint-700 bg-mint-50 border border-mint-200 rounded-full px-2 py-0.5 mb-2">
                  {tag}
                </span>
              )}
              <p className="text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;