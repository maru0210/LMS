"use client";

import {
  Exam,
  ExamData,
  Question,
  saveExam,
  TextQ,
} from "@/app/(teacher)/manager/exam/actions";
import convertJson from "@/app/(teacher)/manager/exam/libs/convertJson";
import { useNotice } from "@/components/notice/Notice";
import Image from "next/image";
import React, { HTMLInputTypeAttribute, useState } from "react";

function Input({
  id,
  type,
  label,
  value,
  readonly = false,
}: {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  value: string | number;
  readonly?: boolean;
}) {
  return (
    <div className="flex w-full items-center">
      <label className="w-24">{label}</label>
      <input
        name={id}
        defaultValue={value}
        type={type}
        readOnly={readonly}
        className="block flex-1 rounded-lg px-2.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300 read-only:bg-white read-only:shadow-none read-only:ring-0 focus:shadow-md read-only:focus:shadow-none"
      />
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex w-full items-center">
      <label className="w-24">{label}</label>
      <textarea
        name={id}
        defaultValue={value}
        className="block flex-1 resize-none rounded-lg px-2.5 py-1 shadow-sm ring-1 ring-inset ring-gray-300 [field-sizing:content] focus:shadow-md"
      />
    </div>
  );
}

function Button({
  text,
  form,
  onClick,
}: {
  text: string;
  form?: string;
  onClick?: () => void;
}) {
  return (
    <button
      form={form}
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-3 py-1.5 text-white transition hover:bg-blue-700"
    >
      {text}
    </button>
  );
}

export default function ExamManager({ defaultExam }: { defaultExam: Exam }) {
  const { notify } = useNotice();

  // const [exam, setExam] = useState<Exam>(defaultExam)
  const [questions, setQuestions] = useState<Question[]>(
    (defaultExam.data as ExamData).questions,
  );

  function saveExamHandler(formData: FormData) {
    const data = convertJson(formData);
    if (data.error) {
      notify("danger", data.error);
      return;
    }

    console.log(data);

    saveExam("midterm", data.questions).then(() => {
      setQuestions(data.questions);
    });
  }

  function addQuestion(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setQuestions((prevState) => [
      ...prevState,
      {
        type: "TEXT",
        id: Date.now().toString(),
        statement: "",
        point: 0,
        answer: "",
      },
    ]);
  }

  function deleteQuestion(id: string) {
    setQuestions((prevState) => prevState.filter((value) => value.id !== id));
  }

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-4">
      <div className="flex justify-end">
        <Button text={"保存"} form={"questions"} />
      </div>

      <h2 className="text-lg">問題</h2>

      <form
        action={saveExamHandler}
        id="questions"
        className="mx-4 flex flex-col gap-8"
      >
        <div className="flex flex-col gap-8">
          {questions.map((question) => {
            switch (question.type) {
              case "TEXT":
                const q = question as TextQ;
                return (
                  <div className="flex items-center gap-4" key={q.id}>
                    <div className="flex flex-1 flex-col gap-2">
                      <Input
                        id={q.id + "-type"}
                        type={"text"}
                        label={"形式"}
                        value={q.type}
                        readonly={true}
                      />
                      <div className="hidden">
                        <Input
                          id={q.id + "-id"}
                          type={"text"}
                          label={"ID"}
                          value={q.id}
                        />
                      </div>
                      <Input
                        id={q.id + "-point"}
                        type={"number"}
                        label={"配点"}
                        value={q.point}
                      />
                      <TextArea
                        id={q.id + "-statement"}
                        label={"問題文"}
                        value={q.statement}
                      />
                      <Input
                        id={q.id + "-answer"}
                        type={"text"}
                        label={"解答"}
                        value={q.answer}
                      />
                    </div>
                    <div>
                      <button
                        type={"button"}
                        onClick={() => deleteQuestion(q.id)}
                      >
                        <Image
                          src={"/xmark.svg"}
                          alt={"削除"}
                          width={24}
                          height={24}
                          className="hover:"
                        />
                      </button>
                    </div>
                  </div>
                );
              default:
                return <></>;
            }
          })}
        </div>

        <button onClick={(event) => addQuestion(event)}>追加</button>
      </form>
    </div>
  );
}
