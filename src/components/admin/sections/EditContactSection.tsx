
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
import EditableList from "../common/EditableList";

const EditContactSection: React.FC = () => {
  const { content } = useCMS();
  const { contact } = content;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Section</CardTitle>
        <CardDescription>Edit contact information</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField 
          path="contact.title" 
          label="Section Title" 
          value={contact.title || ""} 
        />
        <EditableField 
          path="contact.description" 
          label="Section Description" 
          value={contact.description || ""} 
          multiline 
        />
        <EditableField 
          path="contact.email" 
          label="Email Address" 
          value={contact.email || ""} 
        />
        <EditableField 
          path="contact.phone" 
          label="Phone Number" 
          value={contact.phone || ""} 
        />
        <EditableList 
          path="contact.address" 
          items={contact.address || []}
          label="Address Lines" 
        />
        <EditableField 
          path="contact.guarantee" 
          label="Guarantee Text" 
          value={contact.guarantee || ""} 
          multiline 
        />
      </CardContent>
    </Card>
  );
};

export default EditContactSection;
