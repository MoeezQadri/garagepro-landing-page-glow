import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCMS } from "@/contexts/CMSContext";
import { useNavigate } from "react-router-dom";
import { Edit, Save, ArrowLeft, Plus, Trash2, Book, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Simple admin password for demo purposes
// In a real app, use proper authentication
const ADMIN_PASSWORD = "admin123";

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Invalid password. Try 'admin123' for this demo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>GaragePro Admin</CardTitle>
          <CardDescription>Enter your password to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="text-xs text-muted-foreground mt-2">
                For this demo, use password: admin123
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const EditableField: React.FC<{
  path: string;
  label: string;
  value: string;
  type?: string;
  multiline?: boolean;
}> = ({ path, label, value, type = "text", multiline = false }) => {
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

const EditableImage: React.FC<{
  path: string;
  label: string;
  value: string;
}> = ({ path, label, value }) => {
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

const EditableList: React.FC<{
  path: string;
  items: string[];
  label: string;
}> = ({ path, items, label }) => {
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

const EditFeaturesSection: React.FC = () => {
  const { content, updateContent, isEditing } = useCMS();
  const { features } = content;
  
  const handleAddFeature = () => {
    const newFeatures = [...features.items, {
      icon: "CheckCircle",
      title: "New Feature",
      description: "Description of the new feature"
    }];
    updateContent("features.items", newFeatures);
  };
  
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features.items];
    newFeatures.splice(index, 1);
    updateContent("features.items", newFeatures);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Features Section</CardTitle>
        <CardDescription>Edit the features section content</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField path="features.section.title" label="Section Title" value={features.section.title || ""} />
        <EditableField 
          path="features.section.description" 
          label="Section Description" 
          value={features.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Features</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddFeature}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {features.items.map((feature, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Feature {index + 1}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemoveFeature(index)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <EditableField 
                      path={`features.items[${index}].title`} 
                      label="Title" 
                      value={feature.title} 
                    />
                    <EditableField 
                      path={`features.items[${index}].description`} 
                      label="Description" 
                      value={feature.description} 
                      multiline 
                    />
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`features.items[${index}].icon`}>Icon</Label>
                      <select
                        id={`features.items[${index}].icon`}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={feature.icon}
                        onChange={(e) => updateContent(`features.items[${index}].icon`, e.target.value)}
                      >
                        <option value="BarChart3">Bar Chart</option>
                        <option value="Calendar">Calendar</option>
                        <option value="Inbox">Inbox</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="Shield">Shield</option>
                        <option value="CheckCircle">Check Circle</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Comparison Section</h3>
          <EditableField 
            path="features.comparison.title" 
            label="Comparison Title" 
            value={features.comparison.title || ""} 
          />
          <EditableImage 
            path="features.comparison.imageUrl" 
            label="Comparison Image URL" 
            value={features.comparison.imageUrl || ""} 
          />
          
          {isEditing && (
            <div className="mt-4">
              <h4 className="text-base font-medium mb-2">Comparison Points</h4>
              {features.comparison.points.map((point, index) => (
                <Card key={index} className="border-dashed mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">Point {index + 1}</h5>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => {
                          const newPoints = [...features.comparison.points];
                          newPoints.splice(index, 1);
                          updateContent("features.comparison.points", newPoints);
                        }}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <EditableField 
                      path={`features.comparison.points[${index}].title`} 
                      label="Title" 
                      value={point.title} 
                    />
                    <EditableField 
                      path={`features.comparison.points[${index}].description`} 
                      label="Description" 
                      value={point.description} 
                      multiline 
                    />
                  </CardContent>
                </Card>
              ))}
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  const newPoints = [...features.comparison.points, {
                    title: "New Point",
                    description: "Description of the new point"
                  }];
                  updateContent("features.comparison.points", newPoints);
                }}
                className="mb-4"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Point
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EditPricingSection: React.FC = () => {
  const { content, updateContent, isEditing } = useCMS();
  const { pricing } = content;
  
  const handleAddPlan = () => {
    const newPlans = [...pricing.plans, {
      name: "New Plan",
      price: "$0",
      description: "Description of the new plan",
      features: ["Feature 1", "Feature 2"],
      highlight: false,
      buttonText: "Get Started"
    }];
    updateContent("pricing.plans", newPlans);
  };
  
  const handleRemovePlan = (index: number) => {
    const newPlans = [...pricing.plans];
    newPlans.splice(index, 1);
    updateContent("pricing.plans", newPlans);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Section</CardTitle>
        <CardDescription>Edit the pricing plans</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField path="pricing.section.title" label="Section Title" value={pricing.section.title || ""} />
        <EditableField 
          path="pricing.section.description" 
          label="Section Description" 
          value={pricing.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Pricing Plans</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddPlan}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Plan
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {pricing.plans.map((plan, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{plan.name}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemovePlan(index)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <EditableField 
                      path={`pricing.plans[${index}].name`} 
                      label="Plan Name" 
                      value={plan.name} 
                    />
                    <EditableField 
                      path={`pricing.plans[${index}].price`} 
                      label="Price" 
                      value={plan.price} 
                    />
                    <EditableField 
                      path={`pricing.plans[${index}].description`} 
                      label="Description" 
                      value={plan.description} 
                      multiline 
                    />
                    <EditableField 
                      path={`pricing.plans[${index}].buttonText`} 
                      label="Button Text" 
                      value={plan.buttonText} 
                    />
                    <div className="flex items-center space-x-2 my-4">
                      <Checkbox 
                        id={`highlight-${index}`} 
                        checked={plan.highlight}
                        onCheckedChange={(checked) => {
                          updateContent(`pricing.plans[${index}].highlight`, checked === true);
                        }}
                      />
                      <Label htmlFor={`highlight-${index}`}>Highlight this plan</Label>
                    </div>
                    
                    <h4 className="font-medium mt-4 mb-2">Features</h4>
                    <EditableList 
                      path={`pricing.plans[${index}].features`}
                      items={plan.features}
                      label="Plan Features"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Custom Solution Section</h3>
          <EditableField 
            path="pricing.custom.title" 
            label="Title" 
            value={pricing.custom.title || ""} 
          />
          <EditableField 
            path="pricing.custom.description" 
            label="Description" 
            value={pricing.custom.description || ""} 
            multiline 
          />
          <EditableField 
            path="pricing.custom.buttonText" 
            label="Button Text" 
            value={pricing.custom.buttonText || ""} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

const EditTestimonialsSection: React.FC = () => {
  const { content, updateContent, isEditing } = useCMS();
  const { testimonials } = content;
  
  const handleAddTestimonial = () => {
    const newTestimonials = [...testimonials.items, {
      quote: "This is a great product!",
      author: "New Customer",
      position: "Position, Company",
      avatar: "NC",
      rating: 5
    }];
    updateContent("testimonials.items", newTestimonials);
  };
  
  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = [...testimonials.items];
    newTestimonials.splice(index, 1);
    updateContent("testimonials.items", newTestimonials);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonials Section</CardTitle>
        <CardDescription>Edit customer testimonials</CardDescription>
      </CardHeader>
      <CardContent>
        <EditableField 
          path="testimonials.section.title" 
          label="Section Title" 
          value={testimonials.section.title || ""} 
        />
        <EditableField 
          path="testimonials.section.description" 
          label="Section Description" 
          value={testimonials.section.description || ""} 
          multiline 
        />
        
        {isEditing && (
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Testimonials</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddTestimonial}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Testimonial
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {testimonials.items.map((testimonial, index) => (
                <Card key={index} className="border-dashed">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{testimonial.author}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemoveTestimonial(index)}
                        className="h-8 px-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <EditableField 
                      path={`testimonials.items[${index}].quote`} 
                      label="Quote" 
                      value={testimonial.quote} 
                      multiline 
                    />
                    <EditableField 
                      path={`testimonials.items[${index}].author`} 
                      label="Author Name" 
                      value={testimonial.author} 
                    />
                    <EditableField 
                      path={`testimonials.items[${index}].position`} 
                      label="Position" 
                      value={testimonial.position} 
                    />
                    <EditableField 
                      path={`testimonials.items[${index}].avatar`} 
                      label="Avatar Initials" 
                      value={testimonial.avatar} 
                    />
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`testimonials.items[${index}].rating`}>Rating (1-5)</Label>
                      <select
                        id={`testimonials.items[${index}].rating`}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={testimonial.rating}
                        onChange={(e) => updateContent(`testimonials.items[${index}].rating`, parseInt(e.target.value))}
                      >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {isEditing && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Stats</h3>
            {testimonials.stats.map((stat, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="flex-1">
                  <EditableField 
                    path={`testimonials.stats[${index}].label`} 
                    label="Stat Label" 
                    value={stat.label} 
                  />
                </div>
                <div className="flex-1">
                  <EditableField 
                    path={`testimonials.stats[${index}].value`} 
                    label="Stat Value" 
                    value={stat.value} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

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

// Add these imports
import { useBlog, BlogPost } from "@/hooks/useBlog";
import { format } from "date-fns";

// Modify the EditBlogSection component to work with Supabase
const EditBlogSection: React.FC = () => {
  const { useAllPosts, useCreatePost, useUpdatePost, useDeletePost } = useBlog();
  const { data: posts = [], isLoading } = useAllPosts();
  const { mutate: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();
  
  const { content, updateContent, isEditing } = useCMS();
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
