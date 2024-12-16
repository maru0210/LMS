import {checkStatus} from "@/app/lib/supabase/auth";
import {getExam} from "@/app/(student)/exam/actions";
import ExamDetailClient from "@/app/(student)/exam/[examId]/pageClient";

export default async function ExamDetail(
  {params} : {params: Promise<{examId: string}>}
) {
  const examId = (await params).examId;
  await checkStatus("student");

  const exam = await getExam(examId);
  console.log(exam)

  return (
    <div className="p-8">
      <h1 className="mb-8 text-xl text-center">{exam.name}</h1>
      <ExamDetailClient exam={exam} />
    </div>
  )
}