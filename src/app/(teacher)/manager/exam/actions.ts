"use server"

import {Database} from "../../../../../database.types";
import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";

export type Exam = Database["public"]["Tables"]["exams"]["Row"]

export type ExamData = {
  questions: Question[]
}

type metaQ = {
  type: "TEXT" | "SELECT" | "NUMBER",
  id: string,
  statement: string,
  point: number,
}

export type TextQ = {
  answer: string,
} & metaQ

export type SelectQ = {
  selection: string[],
  answer: string,
} & metaQ

export type NumberQ = {
  answer: number,
  error: { upper: number, lower: number },
} & metaQ

export type Question = TextQ | SelectQ | NumberQ

export async function getExams() {
  const supabase = await createClient()
  const {data, error} = await supabase.from("exams").select()
  if(error) redirect("/error");
  return data
}

export async function getExam(id: string) {
  const supabase = await createClient();
  const {data} = await supabase.from("exams").select().eq("id", id);
  return data;
}

export async function saveExam(id: string, questions: Question[]) {
  const supabase = await createClient();
  const {error} = await supabase.from("exams").update({data: {"questions": questions}}).eq("id", id);

  console.log(error)
}
