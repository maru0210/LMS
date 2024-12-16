import {Database} from "../../../../../database.types";

type Exam = Database["public"]["Tables"]["exams"]["Row"]

type metaQ = {
  id: string,
  type: "text" | "select" | "number",
  statement: string,
  point: number,
}

export type TextQ = {
  answer: string,
} & metaQ

export type SelectQ = {
  selection: string[],
  answer: string,
} & metaQ

export type NumberQ = {
  answer: number,
  error: { upper: number, lower: number },
} & metaQ

export type Question = TextQ | SelectQ | NumberQ
