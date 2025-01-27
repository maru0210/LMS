import Navigation from "@/components/Navigation";
import { getExamList } from "@/app/(student)/exam/actions";
import ExamList from "@/app/(student)/exam/ExamList";
import { verifyUserStatus } from "@/lib/supabase/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "試験一覧",
};

export default async function Page() {
  await verifyUserStatus("student");

  return (
    <Navigation>
      <h1 className="mb-4 text-xl font-bold">試験一覧</h1>
      <ExamList list={await getExamList()} />
    </Navigation>
  );
}
