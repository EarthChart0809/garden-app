import { createReadonlyClient } from "@/lib/supabase/server-readonly";

export async function getCurrentUser() {
  const supabase = await createReadonlyClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
