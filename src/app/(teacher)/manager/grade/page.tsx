import {checkStatus} from "@/app/lib/supabase/auth";
import Navigation from "@/app/components/Navigation";
import {getExamLog} from "@/app/(teacher)/manager/grade/actions";
import {getProfile} from "@/app/lib/supabase/actions";
import {getExam} from "@/app/(student)/exam/actions";

export default async function Grade() {
  await checkStatus("teacher");

  const examLog = await getExamLog();
  const examFinLog
    = examLog.filter(value => value.action === "finish");

  const profiles = new Map<string, string>();
  const exams = new Map<string, string>();
  for (const value of examFinLog) {
    if (profiles.get(value.user) === undefined) {
      profiles.set(value.user, (await getProfile(value.user)).name)
    }
    if (exams.get(value.exam) === undefined) {
      exams.set(value.exam, (await getExam(value.exam)).name);
    }
  }

  return (
    <Navigation isAdmin={true}>
      <h1 className="mb-4 text-xl">成績</h1>
      <div>
        {examFinLog.map(value => (
          <div className="flex" key={value.id}>
            <p className="w-32">{profiles.get(value.user)}</p>
            <p className="w-32">{exams.get(value.exam)}</p>
            <p>得点: {value.data}</p>
          </div>
        ))}
      </div>
    </Navigation>
  )
}