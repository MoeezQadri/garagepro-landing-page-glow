
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCMS } from "@/contexts/CMSContext";
import EditableField from "../common/EditableField";
import EditableImage from "../common/EditableImage";

const EditHeroSection: React.FC = () => {
  const { content } = useCMS();
  const { hero } = content;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Edit the main hero section content</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField path="hero.title" label="Title" value={hero.title || ""} />
        <EditableField path="hero.description" label="Description" value={hero.description || ""} multiline />
        <EditableField path="hero.buttonText" label="Button Text" value={hero.buttonText || ""} />
        <EditableImage path="hero.imageUrl" label="Hero Image URL" value={hero.imageUrl || ""} />
        
        <div className="mt-4 p-4 bg-mint-50 border border-mint-200 rounded-md">
          <h3 className="text-sm font-medium mb-2">Logo Preview</h3>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border border-mint-800 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M16 9C14 7 12 12 10 15C8 18 6 15 6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M12 12V21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
              </svg>
            </div>
            <span className="text-xl font-bold">GARAGEPRO</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This is the new logo design with the mint color scheme
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditHeroSection;
