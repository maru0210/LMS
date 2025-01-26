import { Question, TextQ } from "@/app/(teacher)/manager/exam/actions";

export default function convertJson(formData: FormData): {
  questions: Question[];
  error: string | null;
} {
  const data = [...formData.entries()];

  const questions: Question[] = [];

  let i = 0;
  while (i < data.length) {
    if (!data[i][0].endsWith("-type"))
      return { questions: [], error: 'endsWith("-type") is false' };

    switch (data[i][1]) {
      case "TEXT":
        if (
          !(
            data[i + 1][0].endsWith("-id") &&
            data[i + 2][0].endsWith("-point") &&
            data[i + 3][0].endsWith("-statement") &&
            data[i + 4][0].endsWith("-answer")
          )
        )
          return { questions: [], error: "not right data pattern." };

        const q: TextQ = {
          type: "TEXT",
          id: data[i + 1][1] as string,
          point: Number(data[i + 2][1] as string),
          statement: data[i + 3][1] as string,
          answer: data[i + 4][1] as string,
        };

        questions.push(q);
        i += 5;
    }
  }

  return { questions: questions, error: null };
}
