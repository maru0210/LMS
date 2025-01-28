"use client";

import ExamForm from "@/app/(student)/exam/[examId]/ExamForm";
import { startExam } from "@/app/(student)/exam/actions";
import { Exam } from "@/lib/supabase/exam";
import { useState } from "react";

export default function ExamProvider({ id }: { id: string }) {
  const [exam, setExam] = useState<Exam | null>(null);

  if (exam) {
    return <ExamForm exam={exam} />;
  }

  return (
    <button
      onClick={async () => {
        const res = await startExam(id);
        setExam(res);
      }}
    >
      開始
    </button>
  );
}
