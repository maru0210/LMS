"use client";

import { startExam } from "@/app/(student)/exam/actions";
import { Exam } from "@/app/(teacher)/manager/exam/actions";

export default function ExamList({ exams }: { exams: Exam[] }) {
  return (
    <div>
      {exams.map((exam) => (
        <div className="flex items-center justify-between" key={exam.id}>
          <div className="flex flex-col p-2">
            <div className="flex items-center gap-4">
              <p className="text-lg">{exam.name}</p>
              {exam.is_once && (
                <p className="text-sm text-neutral-700">一度のみ</p>
              )}
            </div>
            <p className="text-sm">
              作成日: {new Date(exam.created_at).toLocaleString()}
            </p>
          </div>

          <div>
            <button
              onClick={() => startExam(exam.id)}
              className="rounded-lg border-2 border-neutral-300 px-2 py-0.5 text-neutral-700 shadow-sm transition hover:shadow-md"
            >
              開始
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
