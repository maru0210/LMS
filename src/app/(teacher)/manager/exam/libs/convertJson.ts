import { Question } from "@/lib/exam";

export default function convertJson(formData: FormData): Question[] {
  const data = [...formData.entries()];
  if (data.length % 3 !== 0) throw "Error 1";

  const questions: Question[] = [];

  while (data.length > 0) {
    const e1 = data.shift();
    const e2 = data.shift();
    const e3 = data.shift();
    if (!e1 || !e2 || !e3) throw "Error 2";

    const id = e1[0].split("-")[0];

    if (!e2[0].startsWith(id) || !e3[0].startsWith(id)) throw "Error 3";

    const statement = e1[1] as string;
    const point = Number(e2[1] as string);
    const answer = e3[1] as string;

    questions.push({
      id,
      statement,
      point,
      answer,
    });
  }

  return questions;
}
