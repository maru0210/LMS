import ExamForm from "@/app/(student)/exam/[examId]/ExamForm";
import { getExam } from "@/app/(student)/exam/actions";
import { verifyUserStatus } from "@/lib/supabase/auth";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  const { examId } = await params;
  const exam = await getExam(examId);

  return {
    title: exam.name,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  await verifyUserStatus("student");

  const examId = (await params).examId;

  const exam = await getExam(examId);
  console.log(exam);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-center text-xl">{exam.name}</h1>
      <ExamForm exam={exam} />
    </div>
  );
}
