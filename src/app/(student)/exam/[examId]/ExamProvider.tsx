"use client";

import ExamForm from "@/app/(student)/exam/[examId]/ExamForm";
import { startExam } from "@/app/(student)/exam/actions";
import { Exam } from "@/app/(teacher)/manager/exam/actions";
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
