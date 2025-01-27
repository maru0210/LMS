"use client";

import { finishExam } from "@/app/(student)/exam/actions";
import { Exam, ExamData } from "@/app/(teacher)/manager/exam/actions";
import { toZenkaku } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

function Input({
  id,
  label,
  type,
}: {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        className="border-2 border-neutral-200 px-2 py-1 transition focus:border-neutral-400"
      />
    </div>
  );
}

export default function ExamForm({ exam }: { exam: Exam }) {
  const questions = (exam.data as ExamData).questions;

  function handleSubmit(formData: FormData) {
    console.log(questions);
    console.log([...formData.entries()]);

    const doFinish = confirm("本当に終了しますか？");

    if (doFinish) {
      finishExam(exam.id, formData).then();
    }
  }

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-16">
      <form id={"exam"} action={handleSubmit} className="flex flex-col gap-8">
        {questions.map((question, index) => (
          <div className="flex gap-1" key={question.id}>
            <p>問{index + 1}. </p>
            <Input id={question.id} type={"text"} label={question.statement} />
          </div>
        ))}
      </form>
      <div className="flex justify-end">
        <button
          form={"exam"}
          className="rounded bg-red-500 px-3.5 py-2 text-white transition hover:bg-red-600"
        >
          回答終了
        </button>
      </div>
    </div>
  );
}
