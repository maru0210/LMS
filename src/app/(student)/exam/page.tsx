import Navigation from "@/app/components/Navigation";
import {checkStatus} from "@/lib/supabase/auth";
import {getExams} from "@/app/(student)/exam/actions";
import ExamClient from "@/app/(student)/exam/pageClient";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "試験一覧"
}

export default async function Exam() {
  await checkStatus("student")

  const exams = await getExams()

  return (
    <Navigation>
      <h1 className="mb-4 text-lg">試験一覧</h1>
      <ExamClient exams={exams} />
    </Navigation>
  )
}