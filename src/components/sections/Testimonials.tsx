
import { Star } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";

const Testimonials = () => {
  const { content } = useCMS();
  const { testimonials } = content;
  
  return (
    <section id="testimonials" className="py-20 bg-light">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {testimonials.section.title?.split("Customers")[0] || "What Our"} <span className="heading-gradient">Customers</span> {testimonials.section.title?.split("Customers")[1] || "Say"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {testimonials.section.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.items.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-garage-400 text-garage-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} size={18} className="text-muted" />
                ))}
              </div>
              <p className="text-lg mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-garage-600 flex items-center justify-center text-white font-medium mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-garage-50 border border-garage-100 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {testimonials.stats.map((stat, index) => (
              <div key={index} className={`text-center ${index === 0 ? 'md:text-left' : index === testimonials.stats.length - 1 ? 'md:text-right' : ''}`}>
                <div className="text-5xl font-bold text-garage-700">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
