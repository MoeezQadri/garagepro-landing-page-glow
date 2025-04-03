
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  company_size?: string;
  message?: string;
}

export const useContact = () => {
  // Submit a contact form
  const submitContactForm = async (submission: ContactSubmission) => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }

    return data;
  };

  // React Query hook for form submission
  const useSubmitContact = () => {
    return useMutation({
      mutationFn: submitContactForm,
      onSuccess: () => {
        toast.success("Thank you! Your message has been received. We'll be in touch soon.");
      },
      onError: (error) => {
        toast.error(`Failed to submit form: ${error.message}`);
      }
    });
  };

  return {
    useSubmitContact
  };
};
