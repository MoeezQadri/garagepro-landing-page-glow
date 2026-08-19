CREATE TABLE public.demo_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  shop_name text,
  phone text,
  source text NOT NULL DEFAULT 'demo_sandbox',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.demo_leads TO anon;
GRANT INSERT ON public.demo_leads TO authenticated;
GRANT ALL ON public.demo_leads TO service_role;

ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a demo lead"
ON public.demo_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);