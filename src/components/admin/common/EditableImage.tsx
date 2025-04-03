
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCMS } from "@/contexts/CMSContext";

interface EditableImageProps {
  path: string;
  label: string;
  value: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ path, label, value }) => {
  const { updateContent, isEditing } = useCMS();
  
  if (!isEditing) {
    return null;
  }
  
  return (
    <div className="space-y-2 mb-4">
      <Label htmlFor={path}>{label}</Label>
      <div className="flex space-x-2">
        <Input
          id={path}
          type="text"
          value={value || ""}
          onChange={(e) => updateContent(path, e.target.value)}
          placeholder="Image URL"
          className="flex-1"
        />
      </div>
      {value && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-1">Preview:</p>
          <img 
            src={value} 
            alt="Preview" 
            className="w-full max-h-40 object-cover rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x150?text=Invalid+Image+URL';
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditableImage;
