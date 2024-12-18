import {createClient} from "@/utils/supabase/server";

export async function getExamLog() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("exam_log").select()
  if(error) throw error;
  return data;
}