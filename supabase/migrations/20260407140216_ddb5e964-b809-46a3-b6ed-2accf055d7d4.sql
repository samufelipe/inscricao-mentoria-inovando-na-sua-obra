
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role full access" ON public.checkout_intents;

-- Create a restrictive service-role-only policy
CREATE POLICY "service_role_only"
  ON public.checkout_intents
  AS RESTRICTIVE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Remove from Realtime publication to stop PII streaming
ALTER PUBLICATION supabase_realtime DROP TABLE public.checkout_intents;
