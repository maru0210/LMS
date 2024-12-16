import {checkStatus} from "@/app/lib/supabase/auth";
import ExamManager from "@/app/(teacher)/manager/exam/[examId]/ExamManager";
import Navigation from "@/app/components/Navigation";
import {getExam} from "@/app/(teacher)/manager/exam/actions";

export default async function ExamDetailPage(
  {params}: { params: Promise<{ examId: string }> }
) {
  const examId = (await params).examId;

  await checkStatus("teacher");

  const exam =  await getExam(examId);
  console.log(exam);

  if(!exam || exam.length !== 1) {
    return <p>エラー</p>;
  }

  return (
    <Navigation>
      <p className="mb-4 text-lg">{exam[0].name} (ID: {exam[0].id})</p>
      <div>
        <ExamManager defaultExam={exam[0]} />
      </div>
    </Navigation>
  )
}