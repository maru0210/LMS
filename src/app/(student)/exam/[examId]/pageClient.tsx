"use client"

import {Exam, ExamData} from "@/app/(teacher)/manager/exam/actions";
import {HTMLInputTypeAttribute} from "react";
import {finishExam} from "@/app/(student)/exam/actions";

function Input(
  {id, label, type}: { id: string, label: string; type: HTMLInputTypeAttribute },
) {
  return (
    <div className="flex-1 flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type}
             className="px-2 py-1 border-2 border-neutral-200 focus:border-neutral-400 transition"/>
    </div>
  )
}

export default function ExamDetailClient(
  {exam}: { exam: Exam }
) {
  const questions = (exam.data as ExamData).questions;

  function handleSubmit(formData: FormData) {
    console.log(questions);
    console.log([...formData.entries()]);

    const doFinish = confirm("本当に終了しますか？")

    if (doFinish) {
      finishExam(exam.id, formData).then()
    }
  }

  return (
    <div className="flex flex-col gap-16 max-w-screen-sm mx-auto">
      <form id={"exam"} action={handleSubmit}
            className="flex flex-col gap-8">
        {questions.map((question, index) => (
          <div className="flex" key={question.id}>
            <p className="w-8">問{index + 1}.</p>
            <Input id={question.id} type={"text"} label={question.statement}/>
          </div>
        ))}
      </form>
      <div className="flex justify-end">
        <button form={"exam"}
                className="rounded px-3.5 py-2 bg-red-500 hover:bg-red-600 text-white transition">
          回答終了
        </button>
      </div>
    </div>
  )
}