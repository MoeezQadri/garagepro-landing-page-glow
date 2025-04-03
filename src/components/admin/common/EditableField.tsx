
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCMS } from "@/contexts/CMSContext";

interface EditableFieldProps {
  path: string;
  label: string;
  value: string;
  type?: string;
  multiline?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  path, 
  label, 
  value, 
  type = "text", 
  multiline = false 
}) => {
  const { updateContent, isEditing } = useCMS();
  
  if (!isEditing) {
    return null;
  }
  
  return (
    <div className="space-y-2 mb-4">
      <Label htmlFor={path}>{label}</Label>
      {multiline ? (
        <textarea
          id={path}
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2"
          value={value || ""}
          onChange={(e) => updateContent(path, e.target.value)}
        />
      ) : (
        <Input
          id={path}
          type={type}
          value={value || ""}
          onChange={(e) => updateContent(path, e.target.value)}
        />
      )}
    </div>
  );
};

export default EditableField;
