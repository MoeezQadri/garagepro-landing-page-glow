
import { useCMS } from "@/contexts/CMSContext";
import { CheckCircle, BarChart3, Calendar, Inbox, CreditCard, Shield } from "lucide-react";

// Map for icon components
const iconMap: Record<string, React.ReactNode> = {
  "BarChart3": <BarChart3 size={24} className="text-garage-600" />,
  "Calendar": <Calendar size={24} className="text-garage-600" />,
  "Inbox": <Inbox size={24} className="text-garage-600" />,
  "CreditCard": <CreditCard size={24} className="text-garage-600" />,
  "Shield": <Shield size={24} className="text-garage-600" />,
  "CheckCircle": <CheckCircle size={24} className="text-garage-600" />
};

const Features = () => {
  const { content } = useCMS();
  const { features } = content;
  
  return (
    <section id="features" className="py-20 bg-light">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="heading-gradient">{features.section.title?.split(" ")[0] || "Powerful"}</span> {features.section.title?.split(" ").slice(1).join(" ") || "Features Built for Auto Shops"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {features.section.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.items.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card hover:border-garage-300"
            >
              <div className="p-3 rounded-full bg-garage-100 w-fit mb-4">
                {iconMap[feature.icon] || <CheckCircle size={24} className="text-garage-600" />}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{features.comparison.title}</h2>
              <div className="space-y-4">
                {features.comparison.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle size={20} className="text-garage-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{point.title}</h4>
                      <p className="text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl border border-border overflow-hidden shadow-xl">
                <img
                  src={features.comparison.imageUrl}
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
