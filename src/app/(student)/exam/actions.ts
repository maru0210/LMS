"use server"

import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";
import {getUser} from "@/app/lib/supabase/actions";

export async function getExams() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("exams").select().eq("is_public", true);
  if(error) redirect("/error");
  return data;
}

export async function getExam(id: string) {
  const supabase = await createClient();
  const {data, error} = await supabase.from("exams").select().eq("id", id);
  if(error || !data) redirect("/error");
  return data[0]
}

export async function startExam(id: string) {
  const supabase = await createClient();
  const {error} = await supabase.from("exam_log").insert({
    user: (await getUser()).id,
    action: "start"
  })
  if(error) redirect("/error");
  redirect(`/exam/${id}`);
}
