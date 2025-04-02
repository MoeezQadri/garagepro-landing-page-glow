
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small garages just getting started",
    features: [
      "Up to 2 users",
      "100 customer records",
      "Appointment scheduling",
      "Basic invoicing",
      "Email support",
      "Mobile app access"
    ],
    highlight: false,
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    price: "$199",
    description: "Ideal for established repair shops",
    features: [
      "Up to 5 users",
      "Unlimited customer records",
      "Advanced scheduling with SMS reminders",
      "Inventory management",
      "Customer portal",
      "Digital inspections",
      "Priority support",
      "Advanced reporting"
    ],
    highlight: true,
    buttonText: "Book a Demo"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-location businesses with advanced needs",
    features: [
      "Unlimited users",
      "Multi-location management",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
      "On-site training"
    ],
    highlight: false,
    buttonText: "Contact Sales"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent <span className="heading-gradient">Pricing</span> Plans
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs. All plans include our core features with no hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card flex flex-col justify-between ${plan.highlight ? 'pricing-card-highlight' : ''}`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.name !== "Enterprise" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={18} className="text-garage-600 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={plan.highlight ? "bg-garage-600 hover:bg-garage-700 text-white" : "bg-garage-600/90 hover:bg-garage-600 text-white"}
                size="lg"
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-muted rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-6">
            We offer tailored solutions for large operations with specific requirements.
          </p>
          <Button 
            variant="outline" 
            className="border-garage-400 text-garage-600 hover:bg-garage-50"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
