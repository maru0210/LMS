"use client"

import {HTMLInputTypeAttribute, useState} from "react";

import {Question, TextQ, SelectQ, NumberQ} from "@/app/(teacher)/manager/exam/exam";


function Input(
  {id, type, label, value, readonly = false}: {
    id: string,
    type: HTMLInputTypeAttribute,
    label: string,
    value: string | number,
    readonly ?: boolean
  },
) {
  return (
    <div className="flex items-center w-full max-w-screen-md m-auto">
      <label className="w-36">{label}</label>
      <input
        name={id} defaultValue={value}
        type={type} readOnly={readonly}
        className="flex-1 block rounded-lg px-2.5 py-1 ring-1 ring-inset ring-gray-300 shadow-sm focus:shadow-md
                   read-only:bg-white read-only:ring-0 read-only:shadow-none read-only:focus:shadow-none"/>
    </div>
  )
}

function TextArea(
  {id, label, value}: { id: string, label: string, value: string },
) {
  return (
    <div className="flex items-center w-full max-w-screen-md m-auto">
      <label className="w-36">{label}</label>
      <textarea
        name={id} defaultValue={value}
        className="flex-1 block rounded-lg px-2.5 py-1 ring-1 ring-inset ring-gray-300 shadow-sm focus:shadow-md
                   [field-sizing:content] resize-none"/>
    </div>
  )
}

export default function ExamManager() {
  const [questions, setQuestions] = useState<Question[]>(
    [{
      id: "tmp",
      type: "text",
      statement: "問題文",
      point: 5,
      answer: "答えだよ"
    }]
  )

  function getQuestions(formData: FormData) {
    console.log([...formData.entries()])


  }

  function addQuestion() {
    setQuestions(prevState => [...prevState, {
      id: Date.now().toString(),
      type: "text",
      statement: "",
      point: 0,
      answer: "",
    }])
  }

  return (
    <div>
      <form action={getQuestions}>
        <div className="flex flex-col gap-8">
          {questions.map(question => {
            switch (question.type) {
              case "text":
                const q = question as TextQ;
                return (
                  <div className="flex flex-col gap-2" key={q.id}>
                    <Input id={q.id + "-type"} type={"text"} label={"問題形式"} value={q.type} readonly={true} />
                    <Input id={q.id + "-point"} type={"number"} label={"配点"} value={q.point}/>
                    <TextArea id={q.id + "-statement"} label={"問題文"} value={q.statement}/>
                    <Input id={q.id + "-answer"} type={"text"} label={"解答"} value={q.answer}/>
                  </div>
                )
              default:
                return <></>
            }
          })}
        </div>
        <button>デバッグ</button>
      </form>

      <button onClick={addQuestion}>追加</button>
    </div>
  )
}