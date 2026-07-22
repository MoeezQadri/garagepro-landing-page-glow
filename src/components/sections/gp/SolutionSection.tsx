import { Wrench, PhoneCall, TrendingUp } from "lucide-react";

const columns = [
  {
    icon: Wrench,
    title: "Run the shop",
    body: "Digital job board, invoicing and estimates tied directly to the work, technician performance tracking against time and task estimates, inventory and parts tracking, and clear income-vs-expense reporting. Included from your very first plan — not gated behind an upgrade.",
  },
  {
    icon: PhoneCall,
    title: "Never lose a customer to silence",
    body: "Automated time- and mileage-based service reminders, SMS and email delivery, and post-service review requests — so customers come back before they drift away.",
  },
  {
    icon: TrendingUp,
    title: "Grow without the busywork",
    body: "Reactivation campaigns for lapsed customers, a booking form for your website, and outreach that runs itself once it's set up.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 bg-mint-50/60 border-y border-mint-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
            Everything you need. Nothing you have to unlock later.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="feature-card"
            >
              <div className="w-12 h-12 rounded-sm bg-mint-950 flex items-center justify-center text-primary mb-5 border-2 border-mint-950">
                <Icon size={22} strokeWidth={2.25} />
              </div>
              <h3 className="text-xl font-semibold text-mint-950 mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;