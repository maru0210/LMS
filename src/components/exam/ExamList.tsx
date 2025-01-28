"use client";

import { Exam } from "@/lib/supabase/exam";
import { usePathname } from "next/navigation";

export default function ExamList({ list }: { list: Exam[] }) {
  const pathname = usePathname();

  return (
    <ul className="ml-6 list-disc">
      {list.map((exam) => (
        <li className="rounded-lg transition" key={exam.id}>
          <a className="inline-block" href={pathname + "/" + exam.id}>
            <div className="flex items-center gap-2 border-b border-neutral-500 border-opacity-0 px-1 transition [&:hover]:border-opacity-100">
              <p className="text">{exam.name}</p>
              {exam.is_once && <p className="text-sm">（一度のみ）</p>}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
