"use server";

import { createClient } from "@/utils/supabase/server";
import { Database } from "../../../database.types";

export type Exam = Database["public"]["Tables"]["exams"]["Row"];
export type ExamInsert = Database["public"]["Tables"]["exams"]["Insert"];
export type ExamUpdate = Database["public"]["Tables"]["exams"]["Update"];

export async function getExamList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exams")
    .select("id,name,is_once,since,until")
    .eq("available", true)
    .order("since");
  if (error || !data) throw error;
  return data as Exam[];
}

export async function getExamSummary(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exams")
    .select("id,name,is_once,since,until")
    .eq("id", id);
  if (error || data?.length !== 1) throw error;
  return data[0] as Exam;
}

export async function getExam(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("exams").select().eq("id", id);
  if (error || data?.length !== 1) throw error;
  return data[0];
}

export async function updateExam(id: string, exam: ExamUpdate) {
  const supabase = await createClient();
  const { error } = await supabase.from("exams").update(exam).eq("id", id);
  if (error) throw error;
}

export async function insertExam(exam: ExamInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("exams").insert(exam);
  if (error) throw error;
}
