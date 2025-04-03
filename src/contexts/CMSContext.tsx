import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our CMS content
export type SectionContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
};

export type TestimonialType = {
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating: number;
};

export type PricingPlanType = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight: boolean;
  buttonText: string;
};

export type FeatureType = {
  icon: string;
  title: string;
  description: string;
};

export type BlogPostType = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
  published: boolean;
};

export type CMSContent = {
  hero: SectionContent & {
    stats?: { label: string; value: string }[];
  };
  features: {
    section: SectionContent;
    items: FeatureType[];
    comparison: SectionContent & {
      points: { title: string; description: string }[];
    };
  };
  pricing: {
    section: SectionContent;
    plans: PricingPlanType[];
    custom: SectionContent;
  };
  testimonials: {
    section: SectionContent;
    items: TestimonialType[];
    stats: { label: string; value: string }[];
  };
  contact: SectionContent & {
    email: string;
    phone: string;
    address: string[];
    guarantee: string;
  };
  blog: {
    section: SectionContent;
    posts: BlogPostType[];
  };
};

// Initial default content based on current site content
const defaultContent: CMSContent = {
  hero: {
    title: "Streamline Your Garage Management Business",
    subtitle: "",
    description: "The all-in-one platform for auto shops to manage inventory, appointments, billing, and customer relationships.",
    buttonText: "Book a Demo",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000",
    stats: [
      { label: "garage owners", value: "2,000+" }
    ]
  },
  features: {
    section: {
      title: "Powerful Features Built for Auto Shops",
      description: "Everything you need to run your garage more efficiently and profitably, in one integrated platform."
    },
    items: [
      {
        icon: "BarChart3",
        title: "Real-time Analytics",
        description: "Track your garage's performance with comprehensive analytics dashboards and custom reports."
      },
      {
        icon: "Calendar",
        title: "Smart Scheduling",
        description: "Intelligent appointment booking that optimizes your technicians' time and workshop capacity."
      },
      {
        icon: "Inbox",
        title: "Inventory Management",
        description: "Track parts, manage suppliers, and get automatic reorder reminders when stock runs low."
      },
      {
        icon: "CreditCard",
        title: "Seamless Billing",
        description: "Generate professional invoices, accept online payments, and track outstanding balances."
      },
      {
        icon: "Shield",
        title: "Customer Portal",
        description: "Give your customers access to their vehicle history, upcoming appointments, and estimates."
      },
      {
        icon: "CheckCircle",
        title: "Digital Inspections",
        description: "Create digital inspection reports with photos and videos to share with customers."
      }
    ],
    comparison: {
      title: "Why GaragePro outperforms the competition",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
      points: [
        {
          title: "All-in-One Solution",
          description: "Unlike our competitors who offer fragmented tools, GaragePro consolidates everything you need in one platform."
        },
        {
          title: "Built Specifically for Auto Shops",
          description: "Not a generic business tool adapted for garages - designed from the ground up for your specific workflows."
        },
        {
          title: "Highest Customer Satisfaction",
          description: "Our 98% customer retention rate speaks for itself. Shops that switch to GaragePro stay with GaragePro."
        },
        {
          title: "Dedicated Support Team",
          description: "Get help from specialists who understand the auto repair industry, not generic tech support."
        }
      ]
    }
  },
  pricing: {
    section: {
      title: "Transparent Pricing Plans",
      description: "Choose the plan that fits your business needs. All plans include our core features with no hidden fees."
    },
    plans: [
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
    ],
    custom: {
      title: "Need a custom solution?",
      description: "We offer tailored solutions for large operations with specific requirements.",
      buttonText: "Contact Our Sales Team"
    }
  },
  testimonials: {
    section: {
      title: "What Our Customers Say",
      description: "Join thousands of auto shops already growing their business with GaragePro."
    },
    items: [
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
    ],
    stats: [
      { label: "Customer Satisfaction", value: "98%" },
      { label: "Garages Using GaragePro", value: "2,000+" },
      { label: "Average Efficiency Gain", value: "30%" }
    ]
  },
  contact: {
    title: "Ready to Transform Your Auto Shop?",
    description: "Schedule a personalized demo to see how GaragePro can streamline your operations and boost your profitability.",
    email: "sales@garagepro.com",
    phone: "(555) 123-4567",
    address: ["1234 Auto Avenue", "Suite 500", "Detroit, MI 48226"],
    guarantee: "If GaragePro doesn't improve your garage's efficiency within 90 days, we'll refund your subscription fee. No questions asked."
  },
  blog: {
    section: {
      title: "Latest News & Updates",
      description: "Stay up to date with the latest auto shop tips, industry trends, and GaragePro features."
    },
    posts: [
      {
        id: "1",
        title: "5 Ways to Increase Your Auto Shop's Efficiency",
        slug: "increase-auto-shop-efficiency",
        author: "GaragePro Team",
        date: "2023-10-15",
        summary: "Learn how to streamline your operations and increase your shop's throughput with these proven tactics.",
        content: `
# 5 Ways to Increase Your Auto Shop's Efficiency

Running a successful auto repair shop isn't just about technical expertise—it's about operational efficiency. Here are five proven strategies to help you maximize your shop's productivity:

## 1. Implement a Digital Scheduling System

Paper schedules and phone bookings are outdated. A digital scheduling system allows customers to book appointments online, reducing phone interruptions and administrative overhead. It also provides a clear visual overview of your day, week, or month, making it easier to manage technician time.

## 2. Streamline Your Parts Management

Efficient parts management is crucial for minimizing downtime. Consider implementing:

- Barcode scanning for quick inventory tracking
- Automated reordering for commonly used parts
- Organized storage systems with clear labeling
- Regular inventory audits to prevent discrepancies

## 3. Standardize Your Processes

Create standard operating procedures (SOPs) for common repairs and maintenance tasks. This ensures consistency, reduces errors, and makes training new technicians easier. Document these procedures with step-by-step instructions and photos when possible.

## 4. Improve Communication

Poor communication leads to delays and mistakes. Implement:

- Morning huddles to discuss the day's work
- Digital job boards visible to all staff
- Instant messaging systems for quick questions
- Regular team meetings to address recurring issues

## 5. Invest in Training

Well-trained technicians work faster and more accurately. Allocate time and resources for:

- Regular technical training on new vehicle systems
- Cross-training technicians on multiple vehicle types
- Software training for your shop management system
- Customer service training for front desk staff

By implementing these strategies, you can significantly increase your shop's throughput without sacrificing quality or customer satisfaction.
        `,
        imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1000",
        tags: ["Efficiency", "Management", "Tips"],
        published: true
      },
      {
        id: "2",
        title: "The Future of Auto Repair: Trends to Watch",
        slug: "future-of-auto-repair",
        author: "Michael Rodriguez",
        date: "2023-09-28",
        summary: "From electric vehicles to advanced diagnostics, explore the trends that will shape the future of auto repair.",
        content: `
# The Future of Auto Repair: Trends to Watch

The automotive repair industry is evolving rapidly as vehicle technology advances. Here are the key trends that will shape the future of auto repair:

## Electric Vehicle Specialization

As EV adoption accelerates, shops need technicians specifically trained in electric vehicle repair. This includes:

- High-voltage safety protocols
- Battery system diagnostics and repair
- Electric motor service
- Regenerative braking systems

Shops that invest early in EV capabilities will have a significant competitive advantage in the coming years.

## Advanced Driver Assistance Systems (ADAS)

Modern vehicles come equipped with numerous safety systems that require specialized knowledge:

- Camera and sensor calibration
- Radar alignment
- Lidar system service
- Over-the-air update management

These systems must be precisely calibrated after many common repairs, including windshield replacement and alignment work.

## Augmented Reality Diagnostics

AR technology is changing how technicians diagnose and repair vehicles:

- AR glasses that overlay repair information on the vehicle
- Real-time access to repair procedures while working
- Remote expert assistance for complex problems
- Guided step-by-step repair instructions

This technology reduces errors and improves efficiency, especially for less experienced technicians.

## Predictive Maintenance

Data-driven maintenance is replacing fixed service intervals:

- Telematics data predicts failures before they occur
- AI algorithms analyze vehicle performance data
- Customers receive proactive repair recommendations
- Reduced vehicle downtime and catastrophic failures

Shops that embrace these technologies will not only thrive in the changing landscape but will also provide better service to their customers.
        `,
        imageUrl: "https://images.unsplash.com/photo-1595955777570-bfc489de20db?q=80&w=1000",
        tags: ["Future", "Technology", "Trends"],
        published: true
      }
    ]
  }
};

// Create the context
type CMSContextType = {
  content: CMSContent;
  updateContent: (path: string, value: any) => void;
  saveContent: () => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load content from localStorage on initial render
  useEffect(() => {
    const savedContent = localStorage.getItem('cmsContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Failed to parse saved CMS content', e);
      }
    }
  }, []);

  // Update content at a specific path
  const updateContent = (path: string, value: any) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      const parts = path.split('.');
      let current: any = newContent;
      
      // Navigate to the correct nested object
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        // Handle array indices
        if (part.includes('[') && part.includes(']')) {
          const arrayName = part.split('[')[0];
          const index = parseInt(part.split('[')[1].split(']')[0]);
          current = current[arrayName][index];
        } else {
          current = current[part];
        }
      }
      
      // Set the value at the final property
      const finalPart = parts[parts.length - 1];
      if (finalPart.includes('[') && finalPart.includes(']')) {
        const arrayName = finalPart.split('[')[0];
        const index = parseInt(finalPart.split('[')[1].split(']')[0]);
        current[arrayName][index] = value;
      } else {
        current[finalPart] = value;
      }
      
      return newContent;
    });
  };

  // Save content to localStorage
  const saveContent = () => {
    localStorage.setItem('cmsContent', JSON.stringify(content));
    alert('Content saved successfully!');
  };

  return (
    <CMSContext.Provider value={{ 
      content, 
      updateContent, 
      saveContent, 
      isAdmin, 
      setIsAdmin,
      isEditing,
      setIsEditing
    }}>
      {children}
    </CMSContext.Provider>
  );
};

// Custom hook to use the CMS context
export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
