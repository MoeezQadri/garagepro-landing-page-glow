
import { CheckCircle, BarChart3, Calendar, Inbox, CreditCard, Shield } from "lucide-react";

const features = [
  {
    icon: <BarChart3 size={24} className="text-garage-600" />,
    title: "Real-time Analytics",
    description: "Track your garage's performance with comprehensive analytics dashboards and custom reports."
  },
  {
    icon: <Calendar size={24} className="text-garage-600" />,
    title: "Smart Scheduling",
    description: "Intelligent appointment booking that optimizes your technicians' time and workshop capacity."
  },
  {
    icon: <Inbox size={24} className="text-garage-600" />,
    title: "Inventory Management",
    description: "Track parts, manage suppliers, and get automatic reorder reminders when stock runs low."
  },
  {
    icon: <CreditCard size={24} className="text-garage-600" />,
    title: "Seamless Billing",
    description: "Generate professional invoices, accept online payments, and track outstanding balances."
  },
  {
    icon: <Shield size={24} className="text-garage-600" />,
    title: "Customer Portal",
    description: "Give your customers access to their vehicle history, upcoming appointments, and estimates."
  },
  {
    icon: <CheckCircle size={24} className="text-garage-600" />,
    title: "Digital Inspections",
    description: "Create digital inspection reports with photos and videos to share with customers."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-light">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="heading-gradient">Powerful Features</span> Built for Auto Shops
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run your garage more efficiently and profitably, in one integrated platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card hover:border-garage-300"
            >
              <div className="p-3 rounded-full bg-garage-100 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why GaragePro outperforms the competition</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-garage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">All-in-One Solution</h4>
                    <p className="text-muted-foreground">Unlike our competitors who offer fragmented tools, GaragePro consolidates everything you need in one platform.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-garage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Built Specifically for Auto Shops</h4>
                    <p className="text-muted-foreground">Not a generic business tool adapted for garages - designed from the ground up for your specific workflows.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-garage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Highest Customer Satisfaction</h4>
                    <p className="text-muted-foreground">Our 98% customer retention rate speaks for itself. Shops that switch to GaragePro stay with GaragePro.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-garage-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Dedicated Support Team</h4>
                    <p className="text-muted-foreground">Get help from specialists who understand the auto repair industry, not generic tech support.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl border border-border overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                  alt="GaragePro App Interface"
                  className="w-full rounded-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-garage-500 rounded-full"></div>
                  <span className="text-sm font-medium">Mobile Compatible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
