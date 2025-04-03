
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { useCMS } from "@/contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings, Calendar, User, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NotFound } from "./NotFound";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content, isAdmin } = useCMS();
  
  // Find the post with the matching slug
  const post = content.blog.posts.find(post => post.slug === slug && post.published);
  
  if (!post) {
    return <NotFound />;
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container px-4 md:px-6 py-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="p-0 mb-4">
            <Link to="/blog" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all posts
            </Link>
          </Button>
          
          <div className="rounded-xl overflow-hidden h-[400px] mb-8">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x400?text=Blog+Image';
              }}
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              {post.tags.map((tag, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-muted px-2 py-1 rounded-md text-xs"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
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

export default BlogPost;
