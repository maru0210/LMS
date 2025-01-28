"use client";

import { ExamData, Question } from "@/lib/exam";
import { useState } from "react";
import { Json } from "../../../../../../database.types";

export const useQuestions = (
  value: Json,
): [
  Question[],
  (q: Question[]) => void,
  { addQuestion: (q: Question) => void; removeQuestion: (id: string) => void },
] => {
  const [questions, setQuestions] = useState<Question[]>(
    (JSON.parse(JSON.stringify(value)) as ExamData).questions,
  );

  const addQuestion = (q: Question) => {
    setQuestions((prev) => [...prev, q]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prevState) => prevState.filter((value) => value.id !== id));
  };

  return [questions, setQuestions, { addQuestion, removeQuestion }];
};
