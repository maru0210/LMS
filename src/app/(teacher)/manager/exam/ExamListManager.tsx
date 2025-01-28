"use client";

import ExamList from "@/components/exam/ExamList";
import { Exam, ExamInsert, getExamList, insertExam } from "@/lib/supabase/exam";
import { useState } from "react";

export default function ExamListManager({ list }: { list: Exam[] }) {
  const [examList, setExamList] = useState<Exam[]>(list);

  async function add() {
    const n: ExamInsert = {
      id: "new-exam",
      available: true,
      name: "新規の試験",
      is_once: false,
      data: { questions: [] },
    };

    await insertExam(n);

    setExamList(await getExamList());
  }

  return (
    <div>
      <ExamList list={examList} />
      <button onClick={add}>追加</button>
    </div>
  );
}
