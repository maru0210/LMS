import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getUser();
  if (error || !data.user) redirect("/error");
  return data.user;
}
