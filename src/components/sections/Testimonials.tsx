
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "GaragePro has transformed how we manage our auto shop. The scheduling system alone has increased our capacity by 30%.",
    author: "Michael Rodriguez",
    position: "Owner, Elite Auto Service",
    avatar: "MR",
    rating: 5
  },
  {
    quote: "The inventory management feature has saved us thousands in lost parts and unnecessary orders. It paid for itself in the first month.",
    author: "Sarah Johnson",
    position: "Operations Manager, Johnson's Garage",
    avatar: "SJ",
    rating: 5
  },
  {
    quote: "Our customers love the digital inspection reports. They've dramatically increased our repair authorization rates and customer trust.",
    author: "David Chen",
    position: "Owner, Precision Auto Care",
    avatar: "DC",
    rating: 5
  },
  {
    quote: "I was hesitant to switch software, but GaragePro's team made the transition painless. Best business decision we've made.",
    author: "Jennifer Washington",
    position: "Office Manager, Washington Auto",
    avatar: "JW",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-light">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="heading-gradient">Customers</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of auto shops already growing their business with GaragePro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
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
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-garage-700">98%</div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-garage-700">2,000+</div>
              <p className="text-muted-foreground">Garages Using GaragePro</p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-5xl font-bold text-garage-700">30%</div>
              <p className="text-muted-foreground">Average Efficiency Gain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
