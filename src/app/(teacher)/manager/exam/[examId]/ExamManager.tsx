"use client";

import { useQuestions } from "@/app/(teacher)/manager/exam/[examId]/hook";
import convertJson from "@/app/(teacher)/manager/exam/libs/convertJson";
import { useNotice } from "@/components/notice/Notice";
import { Exam, updateExam } from "@/lib/supabase/exam";
import { cn } from "@/lib/utils";
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
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm text-neutral-700">{label}</label>
      <input
        name={id}
        defaultValue={value}
        type={type}
        readOnly={readonly}
        className="px-1.5 py-0.5 text-sm ring-1 ring-neutral-300 transition hover:ring-neutral-400 focus:ring-blue-700"
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
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm text-neutral-700">{label}</label>
      <textarea
        name={id}
        defaultValue={value}
        className="resize-none px-1.5 py-0.5 text-sm ring-1 ring-gray-300 transition [field-sizing:content] hover:ring-neutral-400 focus:ring-blue-700"
      />
    </div>
  );
}

function Button({
  text,
  onClick,
  className,
  form,
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  form?: string;
}) {
  return (
    <button
      onClick={onClick}
      form={form}
      type={form ? "submit" : "button"}
      className={cn(
        "rounded-lg px-2.5 py-2 text-sm leading-none transition",
        className,
      )}
    >
      {text}
    </button>
  );
}

export default function ExamManager({ exam }: { exam: Exam }) {
  const { notify } = useNotice();

  const [questions, setQuestions, { addQuestion, removeQuestion }] =
    useQuestions(exam.data);

  function add() {
    addQuestion({
      id: Date.now().toString(),
      point: 0,
      statement: "",
      answer: "",
    });
  }

  const [since, setSince] = useState(exam.since.split(".")[0]);
  const [until, setUntil] = useState(exam.until.split(".")[0]);

  const [name, setName] = useState(exam.name);
  const [id, setId] = useState(exam.id);

  async function save(formData: FormData) {
    try {
      const data = convertJson(formData);
      setQuestions(data);
      await updateExam(exam.id, {
        name,
        id,
        data: { questions: data },
        since,
        until,
      });
      notify("success", "保存しました。");
    } catch (e) {
      notify("danger", e as string);
    }
  }

  return (
    <div className="mx-auto max-w-screen-sm">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex gap-1 text-lg">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="[field-sizing:content] hover:shadow-lg focus:shadow-lg"
          />
          (ID:
          <input
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
            className="[field-sizing:content] hover:shadow-lg focus:shadow-lg"
          />
          )
        </div>

        <Button
          text={"保存"}
          form="questions"
          className="bg-blue-600 text-white hover:bg-blue-700"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h2 className="mb-4">日時</h2>
          <div className="mx-1 mb-2 flex items-center gap-2 text-sm">
            <label>開始</label>
            <input
              type="datetime-local"
              value={since}
              onChange={(event) => setSince(event.target.value)}
            />
          </div>
          <div className="mx-1 flex items-center gap-2 text-sm">
            <label>終了</label>
            <input
              type="datetime-local"
              value={until}
              onChange={(event) => setUntil(event.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4">問題</h2>
          <form
            id="questions"
            className="mx-1 flex flex-col gap-8"
            action={save}
          >
            <div className="flex flex-col gap-8">
              {questions.map((q) => (
                <div className="flex items-center gap-4" key={q.id}>
                  <div className="flex flex-1 flex-col gap-2">
                    <TextArea
                      id={q.id + "-statement"}
                      label={"問題文"}
                      value={q.statement}
                    />
                    <Input
                      id={q.id + "-point"}
                      type={"number"}
                      label={"配点"}
                      value={q.point}
                    />
                    <Input
                      id={q.id + "-answer"}
                      type={"text"}
                      label={"解答"}
                      value={q.answer}
                    />
                  </div>
                  <button type={"button"} onClick={() => removeQuestion(q.id)}>
                    <Image
                      src={"/xmark.svg"}
                      alt={"削除"}
                      width={24}
                      height={24}
                      className="hover:"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mx-auto">
              <Button
                text="追加"
                onClick={add}
                className="bg-neutral-100 hover:bg-neutral-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
