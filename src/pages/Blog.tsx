
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import BlogList from "@/components/sections/BlogList";
import { useCMS } from "@/contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Blog = () => {
  const { isAdmin } = useCMS();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <BlogList />
      </main>
      <Footer />
      
      {/* Admin button - visible only to admin users */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button asChild className="rounded-full w-12 h-12 p-0">
            <Link to="/admin">
              <Settings className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blog;
