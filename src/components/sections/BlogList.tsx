
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";
import { format } from "date-fns";

const BlogList = () => {
  const { usePublishedPosts } = useBlog();
  const { data: posts = [], isLoading, error } = usePublishedPosts();
  
  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <p>Loading blog posts...</p>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <p className="text-red-500">Error loading blog posts. Please try again later.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            GaragePro Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Latest news, updates, and insights for auto shop owners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              to={`/blog/${post.slug}`} 
              key={post.id}
              className="group flex flex-col h-full overflow-hidden rounded-xl border border-border transition-colors hover:border-foreground/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image_url || 'https://via.placeholder.com/600x400?text=Blog+Image'} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Blog+Image';
                  }}
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                  {post.summary}
                </p>
                <Button variant="link" className="p-0 self-start group">
                  Read More <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No posts available</h3>
            <p className="text-muted-foreground">Check back soon for new articles!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
