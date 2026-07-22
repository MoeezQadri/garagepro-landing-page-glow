const stats = [
  {
    value: "10–20%",
    body: "of appointments at small service businesses become no-shows — each one an empty bay and a technician with nothing to bill.",
    note: "Industry estimate",
  },
  {
    value: "~1 in 5",
    body: "service calls at a repair shop goes unanswered during business hours — and most callers don't call back, they just call the next shop.",
    note: "Industry estimate",
  },
  {
    value: "60%",
    body: "of a typical repair shop's revenue comes from repeat customers — exactly what's at risk when there's no system prompting a return visit.",
    note: "Industry estimate",
  },
  {
    value: "$0",
    body: "visibility into which technician, which job type, or which week is actually making you money — when it's tracked in someone's head instead of a system.",
    note: null,
  },
];

const ByNumbersSection = () => {
  return (
    <section className="py-20 bg-mint-950 text-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            This isn't hypothetical. Here's what runs through the cracks without one.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-mint-900/40 border border-mint-800 p-6 flex flex-col gap-3"
            >
              <div className="text-4xl md:text-5xl font-bold text-mint-200">{s.value}</div>
              <p className="text-mint-100/90 leading-relaxed text-sm">{s.body}</p>
              {s.note && (
                <span className="text-[11px] uppercase tracking-wide text-mint-400 mt-auto">
                  {s.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ByNumbersSection;