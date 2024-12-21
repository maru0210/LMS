import {getExam} from "@/app/(student)/exam/actions";
import ExamManager from "@/app/(teacher)/manager/exam/[examId]/ExamManager";
import Navigation from "@/components/Navigation";
import {Metadata} from "next";

export async function generateMetadata(
  {params}: { params: Promise<{ examId: string }> }
): Promise<Metadata> {
  const {examId} = await params
  const exam = await getExam(examId);

  return {
    title: "試験管理‐" + exam.name,
  }
}

export default async function Page(
  {params}: { params: Promise<{ examId: string }> }
) {
  const examId = (await params).examId;

  const exam = await getExam(examId);
  console.log(exam);

  return (
    <Navigation isAdmin={true}>
      <p className="mb-4 text-lg">{exam.name} (ID: {exam.id})</p>
      <div>
        <ExamManager defaultExam={exam}/>
      </div>
    </Navigation>
  )
}
