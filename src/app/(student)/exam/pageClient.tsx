"use client"

import {Exam} from "@/app/(teacher)/manager/exam/actions";
import {startExam} from "@/app/(student)/exam/actions";

export default function ExamClient(
  {exams}: {exams: Exam[]}
) {
  return (
    <div>
      {exams.map(exam => (
        <div className="flex justify-between items-center" key={exam.id}>
          <div className="flex flex-col p-2">
            <div className="flex items-center gap-4">
              <p className="text-lg">{exam.name}</p>
              {exam.is_once && <p className="text-sm text-neutral-700">一度のみ</p>}
            </div>
            <p className="text-sm">作成日: {new Date(exam.created_at).toLocaleString()}</p>
          </div>

          <div>
            <button
              onClick={() => startExam(exam.id)}
              className="rounded-lg px-2 py-0.5 border-2 border-neutral-300 text-neutral-700 shadow-sm hover:shadow-md transition"
            >
              開始
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}