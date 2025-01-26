import {getExams} from "@/app/(teacher)/manager/exam/actions";
import Navigation from "@/components/Navigation";
import {verifyUserStatus} from "@/lib/supabase/auth";
import {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "試験管理"
}

export default async function Page() {
  await verifyUserStatus("teacher")

  const exams = await getExams()

  return (
    <Navigation isAdmin={true}>
      <h1 className="mb-4 text-xl">試験一覧</h1>
      <div className="flex flex-col gap-4 mx-4">
        {exams.map(exam => (
          <div className="flex justify-between items-center" key={exam.id}>
            <div className="flex flex-col p-2">
              <div className="flex items-center gap-4">
                <p className="text-lg">{exam.name}</p>
                {exam.is_once && <p className="text-sm text-neutral-700">一度のみ</p>}
              </div>
              <p className="text-sm">作成日: {new Date(exam.created_at).toLocaleString()}</p>
            </div>

            <div>
              <Link href={`/manager/exam/${exam.id}`}
                    className="rounded-lg px-2 py-0.5 border-2 border-neutral-300 text-neutral-700 shadow-sm hover:shadow-md transition">
                編集
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Navigation>
  )
}
