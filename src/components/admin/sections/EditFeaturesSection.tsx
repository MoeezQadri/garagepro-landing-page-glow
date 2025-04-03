
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import EditableField from "../common/EditableField";
import EditableImage from "../common/EditableImage";

const EditFeaturesSection: React.FC = () => {
  const { content, updateContent, isEditing } = useCMS();
  const { features } = content;
  
  const handleAddFeature = () => {
    const newFeatures = [...features.items, {
      icon: "CheckCircle",
      title: "New Feature",
      description: "Description of the new feature"
    }];
    updateContent("features.items", newFeatures);
  };
  
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features.items];
    newFeatures.splice(index, 1);
    updateContent("features.items", newFeatures);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Features Section</CardTitle>
        <CardDescription>Edit the features section content</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField path="features.section.title" label="Section Title" value={features.section.title || ""} />
        <EditableField 
          path="features.section.description" 
          label="Section Description" 
          value={features.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Features</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddFeature}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {features.items.map((feature, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Feature {index + 1}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemoveFeature(index)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <EditableField 
                      path={`features.items[${index}].title`} 
                      label="Title" 
                      value={feature.title} 
                    />
                    <EditableField 
                      path={`features.items[${index}].description`} 
                      label="Description" 
                      value={feature.description} 
                      multiline 
                    />
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`features.items[${index}].icon`}>Icon</Label>
                      <select
                        id={`features.items[${index}].icon`}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={feature.icon}
                        onChange={(e) => updateContent(`features.items[${index}].icon`, e.target.value)}
                      >
                        <option value="BarChart3">Bar Chart</option>
                        <option value="Calendar">Calendar</option>
                        <option value="Inbox">Inbox</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="Shield">Shield</option>
                        <option value="CheckCircle">Check Circle</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Comparison Section</h3>
          <EditableField 
            path="features.comparison.title" 
            label="Comparison Title" 
            value={features.comparison.title || ""} 
          />
          <EditableImage 
            path="features.comparison.imageUrl" 
            label="Comparison Image URL" 
            value={features.comparison.imageUrl || ""} 
          />
          
          {isEditing && (
            <div className="mt-4">
              <h4 className="text-base font-medium mb-2">Comparison Points</h4>
              {features.comparison.points.map((point, index) => (
                <Card key={index} className="border-dashed mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Point {index + 1}</h5>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => {
                          const newPoints = [...features.comparison.points];
                          newPoints.splice(index, 1);
                          updateContent("features.comparison.points", newPoints);
                        }}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <EditableField 
                      path={`features.comparison.points[${index}].title`} 
                      label="Title" 
                      value={point.title} 
                    />
                    <EditableField 
                      path={`features.comparison.points[${index}].description`} 
                      label="Description" 
                      value={point.description} 
                      multiline 
                    />
                  </CardContent>
                </Card>
              ))}
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  const newPoints = [...features.comparison.points, {
                    title: "New Point",
                    description: "Description of the new point"
                  }];
                  updateContent("features.comparison.points", newPoints);
                }}
                className="mb-4"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Point
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditFeaturesSection;
