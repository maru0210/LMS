"use server";

import { ExamData } from "@/app/(teacher)/manager/exam/actions";
import { getCurrentUser } from "@/lib/supabase/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type ExamSummary = {
  id: string;
  name: string;
  is_once: boolean;
  since: string;
  until: string;
};

export async function getExamList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exams")
    .select("id,name,is_once,since,until")
    .eq("available", true)
    .order("since");
  if (error) throw error;
  return data as ExamSummary[];
}

export async function getExamSummary(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exams")
    .select("id,name,is_once,since,until")
    .eq("id", id);
  if (error || data?.length !== 1) throw error;
  return data[0];
}

export async function getExamDetails(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("exams").select().eq("id", id);
  if (error || data?.length !== 1) throw error;
  return data[0];
}

export async function startExam(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("exam_log").insert({
    user: (await getCurrentUser()).id,
    exam: id,
    action: "BEGIN",
  });
  if (error) throw error;
  return await getExamDetails(id);
}

export async function finishExam(id: string, formData: FormData) {
  // 点数を計算
  const exam = await getExamDetails(id);
  const questions = (exam.data as ExamData).questions;
  const answers = [...formData.entries()];
  if (questions.length !== answers.length) {
    console.error("問題と回答の数が一致しません。");
    return;
  }

  let score = 0;
  answers.forEach((value, index) => {
    if (questions[index].id === value[0]) {
      if (questions[index].answer === value[1]) score += questions[index].point;
    } else {
      console.error("問題と回答のIDが一致しません。");
    }
  });

  console.log("得点は", score, "です。");

  const supabase = await createClient();
  const { error } = await supabase.from("exam_log").insert({
    user: (await getCurrentUser()).id,
    exam: exam.id,
    action: "finish",
    data: score.toString(),
  });
  if (error) redirect("/error");
  redirect("/exam");
}
