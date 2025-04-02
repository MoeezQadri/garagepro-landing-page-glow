
import { Mail, Phone, MapPin } from "lucide-react";
import DemoForm from "../ui/DemoForm";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="heading-gradient">Transform</span> Your Auto Shop?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Schedule a personalized demo to see how GaragePro can streamline your operations and boost your profitability.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-garage-600 mt-1" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">sales@garagepro.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-garage-600 mt-1" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-garage-600 mt-1" />
                <div>
                  <h3 className="font-medium">Visit Us</h3>
                  <p className="text-muted-foreground">
                    1234 Auto Avenue<br />
                    Suite 500<br />
                    Detroit, MI 48226
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-garage-50 border border-garage-100 rounded-xl">
              <h3 className="font-medium mb-2">Our Guarantee</h3>
              <p className="text-muted-foreground">
                If GaragePro doesn't improve your garage's efficiency within 90 days, we'll refund your subscription fee. No questions asked.
              </p>
            </div>
          </div>
          
          <div id="book-demo" className="bg-white p-8 rounded-xl border border-border shadow-md">
            <h3 className="text-2xl font-bold mb-6">Book Your Free Demo</h3>
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
