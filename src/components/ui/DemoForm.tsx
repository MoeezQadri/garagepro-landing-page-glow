
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const DemoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companySize: "",
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you! A member of our team will contact you shortly.");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        companySize: "",
        agreeToTerms: false
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Business Name</Label>
          <Input
            id="companyName"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Garage Name"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="companySize">Business Size</Label>
        <Select
          value={formData.companySize}
          onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select business size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-5">1-5 employees</SelectItem>
            <SelectItem value="6-10">6-10 employees</SelectItem>
            <SelectItem value="11-25">11-25 employees</SelectItem>
            <SelectItem value="26-50">26-50 employees</SelectItem>
            <SelectItem value="50+">50+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="agreeToTerms" 
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => 
            setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
          }
        />
        <Label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
          I agree to GaragePro's terms of service and privacy policy
        </Label>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-garage-600 hover:bg-garage-700 text-white" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Schedule My Demo"}
      </Button>
    </form>
  );
};

export default DemoForm;
