export type ExamData = {
  questions: Question[];
};

export type Question = {
  id: string;
  point: number;
  statement: string;
  answer: string;
};
