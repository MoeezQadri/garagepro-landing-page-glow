
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";

interface EditableListProps {
  path: string;
  items: string[];
  label: string;
}

const EditableList: React.FC<EditableListProps> = ({ path, items, label }) => {
  const { updateContent, isEditing } = useCMS();
  
  if (!isEditing) {
    return null;
  }
  
  const handleAddItem = () => {
    updateContent(path, [...items, ""]);
  };
  
  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    updateContent(path, newItems);
  };
  
  const handleUpdateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    updateContent(path, newItems);
  };
  
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleAddItem}
          className="h-8 px-2"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Item
        </Button>
      </div>
      <div className="space-y-2 mt-2">
        {items.map((item, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <Input
              value={item}
              onChange={(e) => handleUpdateItem(index, e.target.value)}
              className="flex-1"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleRemoveItem(index)}
              className="h-8 px-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditableList;
