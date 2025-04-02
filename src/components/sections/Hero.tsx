
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Streamline Your <span className="heading-gradient">Garage Management</span> Business
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              The all-in-one platform for auto shops to manage inventory, appointments, billing, and customer relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-garage-600 hover:bg-garage-700 text-white"
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Demo <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-garage-400 text-garage-600 hover:bg-garage-50"
              >
                See How It Works
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-garage-400 border-2 border-white flex items-center justify-center text-xs text-white font-medium">AM</div>
                <div className="w-8 h-8 rounded-full bg-garage-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">JS</div>
                <div className="w-8 h-8 rounded-full bg-garage-600 border-2 border-white flex items-center justify-center text-xs text-white font-medium">KL</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">2,000+</span> garage owners
              </p>
            </div>
          </div>
          <div className="relative animate-fade-in-right">
            <div className="absolute inset-0 bg-gradient-to-r from-garage-400/10 to-garage-600/10 rounded-xl"></div>
            <div className="rounded-xl border border-border overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000"
                alt="GaragePro Dashboard"
                className="w-full rounded-xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Live Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
