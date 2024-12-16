import Navigation from "@/app/components/Navigation";
import {checkStatus} from "@/app/lib/supabase/auth";
import ExamManager from "@/app/(teacher)/manager/exam/ExamManager";

export default async function ExamPage() {
  await checkStatus("teacher");

  return (
    <Navigation>
      <div>
        <ExamManager />
      </div>
    </Navigation>
  )
}