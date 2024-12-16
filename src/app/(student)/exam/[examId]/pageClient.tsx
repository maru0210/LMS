import {Exam, ExamData} from "@/app/(teacher)/manager/exam/actions";

export default function ExamDetailClient(
  {exam} : {exam: Exam}
) {
  const questions = (exam.data as ExamData).questions;
  console.log(questions);

  return (
    <div>

    </div>
  )
}