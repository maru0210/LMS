import ExamListManager from "@/app/(teacher)/manager/exam/ExamListManager";
import Navigation from "@/components/Navigation";
import { verifyUserStatus } from "@/lib/supabase/auth";
import { getExamList } from "@/lib/supabase/exam";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "試験管理",
};

export default async function Page() {
  await verifyUserStatus("teacher");

  return (
    <Navigation isAdmin={true}>
      <h1 className="mb-4 text-xl">試験一覧</h1>
      <ExamListManager list={await getExamList()} />
    </Navigation>
  );
}
