
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
      </CardContent>
    </Card>
  );
};

export default EditHeroSection;
