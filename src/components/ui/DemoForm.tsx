
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useContact, ContactSubmission } from "@/hooks/useContact";

const DemoForm = () => {
  const { useSubmitContact } = useContact();
  const { mutate: submitContact, isPending } = useSubmitContact();
  
  const [formData, setFormData] = useState<ContactSubmission & { agreeToTerms: boolean }>({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    company_size: "",
    message: "Requesting a demo",
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    // Submit to Supabase
    const { agreeToTerms, ...submission } = formData;
    submitContact(submission, {
      onSuccess: () => {
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          company_name: "",
          company_size: "",
          message: "Requesting a demo",
          agreeToTerms: false
        });
      }
    });
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
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company_name">Business Name</Label>
          <Input
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Your Garage Name"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company_size">Business Size</Label>
        <Select
          value={formData.company_size}
          onValueChange={(value) => setFormData(prev => ({ ...prev, company_size: value }))}
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
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Schedule My Demo"}
      </Button>
    </form>
  );
};

export default DemoForm;
