import {ExamData} from "@/app/(teacher)/manager/exam/actions";
import {getCurrentUser} from "@/lib/supabase/user";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function getExams() {
  const supabase = await createClient();
  const {data, error} = await supabase.from("exams").select().eq("is_public", true);
  if (error) redirect("/error");
  return data;
}

export async function getExam(id: string) {
  const supabase = await createClient();
  const {data, error} = await supabase.from("exams").select().eq("id", id);
  if (error || !data) redirect("/error");
  return data[0]
}

export async function startExam(id: string) {
  const supabase = await createClient();
  const {error} = await supabase.from("exam_log").insert({
    user: (await getCurrentUser()).id,
    exam: id,
    action: "start"
  })
  if (error) redirect("/error");
  redirect(`/exam/${id}`);
}

export async function finishExam(id: string, formData: FormData) {
  // 点数を計算
  const exam = await getExam(id);
  const questions = (exam.data as ExamData).questions
  const answers = [...formData.entries()]
  if (questions.length !== answers.length) {
    console.error("問題と回答の数が一致しません。");
    return;
  }

  let score = 0;
  answers.forEach((value, index) => {
    if (questions[index].id === value[0]) {
      if (questions[index].answer === value[1]) score += questions[index].point
    } else {
      console.error("問題と回答のIDが一致しません。");
    }
  })

  console.log("得点は", score, "です。")

  const supabase = await createClient();
  const {error} = await supabase.from("exam_log").insert({
    user: (await getCurrentUser()).id,
    exam: exam.id,
    action: "finish",
    data: score.toString()
  })
  if (error) redirect("/error");
  redirect('/exam')
}
