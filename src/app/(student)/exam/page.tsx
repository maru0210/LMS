import Navigation from "@/components/Navigation";
import {getExams} from "@/app/(student)/exam/actions";
import ExamList from "@/app/(student)/exam/ExamList";
import {verifyUserStatus} from "@/lib/supabase/auth";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "試験一覧"
}

export default async function Page() {
  await verifyUserStatus("student")

  const exams = await getExams()

  return (
    <Navigation>
      <h1 className="mb-4 text-lg">試験一覧</h1>
      <ExamList exams={exams} />
    </Navigation>
  )
}