
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import DemoForm from "../ui/DemoForm";
import { useCMS } from "@/contexts/CMSContext";

const Contact = () => {
  const { content } = useCMS();
  const { contact } = content;
  
  return (
    <section id="contact" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {contact.title?.split("Transform")[0] || "Ready to"} <span className="heading-gradient">Transform</span> {contact.title?.split("Transform")[1] || "Your Auto Shop?"}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {contact.description}
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-garage-600 mt-1" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">{contact.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-garage-600 mt-1" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-garage-600 mt-1" />
                <div>
                  <h3 className="font-medium">Visit Us</h3>
                  <p className="text-muted-foreground">
                    {contact.address.map((line, index) => (
                      <React.Fragment key={index}>
                        {line}<br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-garage-50 border border-garage-100 rounded-xl">
              <h3 className="font-medium mb-2">Our Guarantee</h3>
              <p className="text-muted-foreground">
                {contact.guarantee}
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
