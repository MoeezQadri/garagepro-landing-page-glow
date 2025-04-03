
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlog = () => {
  const queryClient = useQueryClient();

  // Get all published blog posts
  const getPublishedPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }

    return data || [];
  };

  // Get a specific blog post by slug
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // Post not found
        return null;
      }
      console.error("Error fetching blog post:", error);
      throw error;
    }

    return data;
  };

  // Get all blog posts (including unpublished ones) - for admin use
  const getAllPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all blog posts:", error);
      throw error;
    }

    return data || [];
  };

  // Create a new blog post
  const createPost = async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }

    return data;
  };

  // Update an existing blog post
  const updatePost = async ({ id, ...post }: Partial<BlogPost> & { id: string }): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(post)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }

    return data;
  };

  // Delete a blog post
  const deletePost = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      throw error;
    }
  };

  // React Query hooks
  const usePublishedPosts = () => {
    return useQuery({
      queryKey: ["blog", "published"],
      queryFn: getPublishedPosts
    });
  };

  const usePostBySlug = (slug: string) => {
    return useQuery({
      queryKey: ["blog", "post", slug],
      queryFn: () => getPostBySlug(slug),
      enabled: !!slug
    });
  };

  const useAllPosts = () => {
    return useQuery({
      queryKey: ["blog", "all"],
      queryFn: getAllPosts
    });
  };

  const useCreatePost = () => {
    return useMutation({
      mutationFn: createPost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blog"] });
        toast.success("Blog post created successfully");
      },
      onError: (error) => {
        toast.error(`Failed to create blog post: ${error.message}`);
      }
    });
  };

  const useUpdatePost = () => {
    return useMutation({
      mutationFn: updatePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blog"] });
        toast.success("Blog post updated successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update blog post: ${error.message}`);
      }
    });
  };

  const useDeletePost = () => {
    return useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blog"] });
        toast.success("Blog post deleted successfully");
      },
      onError: (error) => {
        toast.error(`Failed to delete blog post: ${error.message}`);
      }
    });
  };

  return {
    usePublishedPosts,
    usePostBySlug,
    useAllPosts,
    useCreatePost,
    useUpdatePost,
    useDeletePost
  };
};
