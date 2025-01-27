import ExamProvider from "@/app/(student)/exam/[examId]/ExamProvider";
import { getExamSummary } from "@/app/(student)/exam/actions";
import { verifyUserStatus } from "@/lib/supabase/auth";
import { fmtDate } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  const { examId } = await params;
  const exam = await getExamSummary(examId);

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
  const exam = await getExamSummary(examId);

  return (
    <div className="p-8">
      <div className="mx-auto max-w-screen-sm">
        <div className="mb-8">
          <h1 className="mb-2 text-xl">{exam.name}</h1>
          <p className="text-sm">
            開始:{fmtDate(new Date(exam.since))} / 終了:
            {fmtDate(new Date(exam.until))}
          </p>
        </div>

        <ExamProvider id={examId} />
        {/*<ExamForm exam={exam} />*/}
      </div>
    </div>
  );
}
