
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

const EditTestimonialsSection: React.FC = () => {
  const { content, updateContent, isEditing } = useCMS();
  const { testimonials } = content;
  
  const handleAddTestimonial = () => {
    const newTestimonials = [...testimonials.items, {
      quote: "This is a great product!",
      author: "New Customer",
      position: "Position, Company",
      avatar: "NC",
      rating: 5
    }];
    updateContent("testimonials.items", newTestimonials);
  };
  
  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = [...testimonials.items];
    newTestimonials.splice(index, 1);
    updateContent("testimonials.items", newTestimonials);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials Section</CardTitle>
        <CardDescription>Edit customer testimonials</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField 
          path="testimonials.section.title" 
          label="Section Title" 
          value={testimonials.section.title || ""} 
        />
        <EditableField 
          path="testimonials.section.description" 
          label="Section Description" 
          value={testimonials.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Testimonials</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddTestimonial}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Testimonial
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {testimonials.items.map((testimonial, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{testimonial.author}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemoveTestimonial(index)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <EditableField 
                      path={`testimonials.items[${index}].quote`} 
                      label="Quote" 
                      value={testimonial.quote} 
                      multiline 
                    />
                    <EditableField 
                      path={`testimonials.items[${index}].author`} 
                      label="Author Name" 
                      value={testimonial.author} 
                    />
                    <EditableField 
                      path={`testimonials.items[${index}].position`} 
                      label="Position" 
                      value={testimonial.position} 
                    />
                    <EditableField 
                      path={`testimonials.items[${index}].avatar`} 
                      label="Avatar Initials" 
                      value={testimonial.avatar} 
                    />
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`testimonials.items[${index}].rating`}>Rating (1-5)</Label>
                      <select
                        id={`testimonials.items[${index}].rating`}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={testimonial.rating}
                        onChange={(e) => updateContent(`testimonials.items[${index}].rating`, parseInt(e.target.value))}
                      >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {isEditing && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Stats</h3>
            {testimonials.stats.map((stat, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="flex-1">
                  <EditableField 
                    path={`testimonials.stats[${index}].label`} 
                    label="Stat Label" 
                    value={stat.label} 
                  />
                </div>
                <div className="flex-1">
                  <EditableField 
                    path={`testimonials.stats[${index}].value`} 
                    label="Stat Value" 
                    value={stat.value} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditTestimonialsSection;
