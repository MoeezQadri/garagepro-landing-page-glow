
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useNavigate } from "react-router-dom";
import EditHeroSection from "./sections/EditHeroSection";
import EditFeaturesSection from "./sections/EditFeaturesSection";
import EditPricingSection from "./sections/EditPricingSection";
import EditTestimonialsSection from "./sections/EditTestimonialsSection";
import EditContactSection from "./sections/EditContactSection";
import EditBlogSection from "./sections/EditBlogSection";

const AdminPanel: React.FC = () => {
  const { saveContent, isEditing, setIsEditing } = useCMS();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Site
            </Button>
            <h1 className="text-2xl font-bold">GaragePro Admin</h1>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <Button 
                variant="default" 
                onClick={() => {
                  saveContent();
                  setIsEditing(false);
                }}
              >
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit Content
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero" className="space-y-4">
            <EditHeroSection />
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <EditFeaturesSection />
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4">
            <EditPricingSection />
          </TabsContent>
          
          <TabsContent value="testimonials" className="space-y-4">
            <EditTestimonialsSection />
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <EditContactSection />
          </TabsContent>
          
          <TabsContent value="blog" className="space-y-4">
            <EditBlogSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
