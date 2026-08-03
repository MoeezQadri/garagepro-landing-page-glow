import {
  UserList,
  ChartLineUp,
  Timer,
  Wrench,
} from "@phosphor-icons/react";

const columns = [
  {
    icon: UserList,
    title: "Every customer, one record",
    body: "Search a name and see everything: every vehicle, every visit, every job. No digging through folders or trying to remember.",
  },
  {
    icon: ChartLineUp,
    title: "Know your numbers today",
    body: "See what you've earned and spent as jobs happen. No more adding up a shoebox of receipts at the end of the month to figure out where you stand.",
  },
  {
    icon: Timer,
    title: "See who's actually performing",
    body: "Hours billed against hours estimated, job by job and tech by tech. Know where the time is going before it becomes a habit.",
  },
  {
    icon: Wrench,
    title: "Less paperwork, more wrench time",
    body: "Every hour spent chasing an invoice or retyping a job is an hour off the shop floor. GaragePro exists to give that hour back.",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="feature-card"
            >
              <div className="w-12 h-12 rounded-2xl border border-border bg-muted/40 flex items-center justify-center mb-5" style={{ color: "hsl(var(--brand-accent))" }}>
                <Icon size={24} weight="duotone" />
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