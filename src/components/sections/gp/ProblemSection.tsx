import { PhoneSlash, Receipt, LockKey, type Icon as PhosphorIcon } from "@phosphor-icons/react";

const problems: { icon: PhosphorIcon; text: string }[] = [
  {
    icon: PhoneSlash,
    text: "A customer no-shows or ghosts an estimate, and nothing catches it. By the time you notice they've stopped coming in, you have no idea if they're just busy or already gone \u2014 and nothing would have flagged it in time to bring them back.",
  },
  {
    icon: Receipt,
    text: "You reconcile the month from memory, paper job cards, and a shoebox of receipts \u2014 so the number you land on is a guess, not a fact.",
  },
  {
    icon: LockKey,
    text: "You've looked at other shop software. Every option either costs more than a small shop can justify, or buries the parts you actually need \u2014 the job board, inventory, technician tracking \u2014 behind a second, pricier plan.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mint-950">
            You already know what this is costing you.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="rounded-xl border border-mint-100 bg-mint-50/40 p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-2xl border flex items-center justify-center" style={{ color: "#b7410e", borderColor: "#b7410e33", backgroundColor: "#b7410e14" }}>
                <Icon size={22} weight="duotone" />
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