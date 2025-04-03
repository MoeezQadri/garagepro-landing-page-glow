
import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Book, Eye } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";
import { useBlog, BlogPost } from "@/hooks/useBlog";
import EditableField from "../common/EditableField";

const EditBlogSection: React.FC = () => {
  const { useAllPosts, useCreatePost, useUpdatePost, useDeletePost } = useBlog();
  const { data: posts = [], isLoading } = useAllPosts();
  const { mutate: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();
  
  const { content, isEditing } = useCMS();
  const { blog } = content;
  const navigate = useNavigate();
  
  const handleAddPost = () => {
    // Generate a slug based on current timestamp
    const timestamp = Date.now();
    const slug = `new-post-${timestamp}`;
    
    // Create a new post in Supabase
    createPost({
      title: "New Blog Post",
      slug,
      content: "# New Blog Post\n\nWrite your content here...",
      summary: "Summary of the blog post",
      published: false
    });
  };
  
  const handleRemovePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      deletePost(id);
    }
  };
  
  const handleUpdatePost = (post: BlogPost, field: keyof BlogPost, value: any) => {
    updatePost({
      id: post.id,
      [field]: value
    });
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blog Section</CardTitle>
          <CardDescription>Loading blog posts...</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Section</CardTitle>
        <CardDescription>Manage your blog posts</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField path="blog.section.title" label="Section Title" value={blog.section.title || ""} />
        <EditableField 
          path="blog.section.description" 
          label="Section Description" 
          value={blog.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Blog Posts (Supabase)</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddPost}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Post
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base flex items-center">
                        <Book className="h-4 w-4 mr-2" />
                        {post.title}
                        {!post.published && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded ml-2">
                            Draft
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => navigate(`/blog/${post.slug}`)}
                          className="h-8 px-2"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleRemovePost(post.id)}
                          className="h-8 px-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`title-${post.id}`}>Title</Label>
                      <Input
                        id={`title-${post.id}`}
                        value={post.title}
                        onChange={(e) => handleUpdatePost(post, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`slug-${post.id}`}>Slug (URL path)</Label>
                      <Input
                        id={`slug-${post.id}`}
                        value={post.slug}
                        onChange={(e) => handleUpdatePost(post, 'slug', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`summary-${post.id}`}>Summary</Label>
                      <Textarea
                        id={`summary-${post.id}`}
                        value={post.summary || ""}
                        onChange={(e) => handleUpdatePost(post, 'summary', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`content-${post.id}`}>
                        Content (Markdown)
                      </Label>
                      <Textarea
                        id={`content-${post.id}`}
                        className="min-h-[300px] font-mono text-sm"
                        value={post.content || ""}
                        onChange={(e) => handleUpdatePost(post, 'content', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Use Markdown formatting: # for headings, ** for bold, * for italic, etc.
                      </p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`image-${post.id}`}>Featured Image URL</Label>
                      <Input
                        id={`image-${post.id}`}
                        value={post.image_url || ""}
                        onChange={(e) => handleUpdatePost(post, 'image_url', e.target.value)}
                        placeholder="Image URL"
                      />
                      {post.image_url && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                          <img 
                            src={post.image_url} 
                            alt="Preview" 
                            className="w-full max-h-40 object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x150?text=Invalid+Image+URL';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 my-4">
                      <Checkbox 
                        id={`published-${post.id}`} 
                        checked={post.published}
                        onCheckedChange={(checked) => {
                          handleUpdatePost(post, 'published', checked === true);
                        }}
                      />
                      <Label htmlFor={`published-${post.id}`}>Publish this post</Label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created: {format(new Date(post.created_at), 'MMM d, yyyy')} · 
                      Updated: {format(new Date(post.updated_at), 'MMM d, yyyy')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditBlogSection;
