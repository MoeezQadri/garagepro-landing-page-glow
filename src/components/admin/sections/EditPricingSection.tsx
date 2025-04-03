
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import EditableField from "../common/EditableField";
import EditableList from "../common/EditableList";

const EditPricingSection: React.FC = () => {
  const { content, updateContent, isEditing } = useCMS();
  const { pricing } = content;
  
  const handleAddPlan = () => {
    const newPlans = [...pricing.plans, {
      name: "New Plan",
      price: "$0",
      description: "Description of the new plan",
      features: ["Feature 1", "Feature 2"],
      highlight: false,
      buttonText: "Get Started"
    }];
    updateContent("pricing.plans", newPlans);
  };
  
  const handleRemovePlan = (index: number) => {
    const newPlans = [...pricing.plans];
    newPlans.splice(index, 1);
    updateContent("pricing.plans", newPlans);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Section</CardTitle>
        <CardDescription>Edit the pricing plans</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField path="pricing.section.title" label="Section Title" value={pricing.section.title || ""} />
        <EditableField 
          path="pricing.section.description" 
          label="Section Description" 
          value={pricing.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Pricing Plans</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddPlan}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Plan
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {pricing.plans.map((plan, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{plan.name}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemovePlan(index)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <EditableField 
                      path={`pricing.plans[${index}].name`} 
                      label="Plan Name" 
                      value={plan.name} 
                    />
                    <EditableField 
                      path={`pricing.plans[${index}].price`} 
                      label="Price" 
                      value={plan.price} 
                    />
                    <EditableField 
                      path={`pricing.plans[${index}].description`} 
                      label="Description" 
                      value={plan.description} 
                      multiline 
                    />
                    <EditableField 
                      path={`pricing.plans[${index}].buttonText`} 
                      label="Button Text" 
                      value={plan.buttonText} 
                    />
                    <div className="flex items-center space-x-2 my-4">
                      <Checkbox 
                        id={`highlight-${index}`} 
                        checked={plan.highlight}
                        onCheckedChange={(checked) => {
                          updateContent(`pricing.plans[${index}].highlight`, checked === true);
                        }}
                      />
                      <Label htmlFor={`highlight-${index}`}>Highlight this plan</Label>
                    </div>
                    
                    <h4 className="font-medium mt-4 mb-2">Features</h4>
                    <EditableList 
                      path={`pricing.plans[${index}].features`}
                      items={plan.features}
                      label="Plan Features"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Custom Solution Section</h3>
          <EditableField 
            path="pricing.custom.title" 
            label="Title" 
            value={pricing.custom.title || ""} 
          />
          <EditableField 
            path="pricing.custom.description" 
            label="Description" 
            value={pricing.custom.description || ""} 
            multiline 
          />
          <EditableField 
            path="pricing.custom.buttonText" 
            label="Button Text" 
            value={pricing.custom.buttonText || ""} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EditPricingSection;
