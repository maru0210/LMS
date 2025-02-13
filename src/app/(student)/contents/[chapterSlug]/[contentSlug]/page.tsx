import Navigation from "@/components/Navigation";
import { getContents } from "@/lib/microCMS/microcms";
import { verifyUserStatus } from "@/lib/supabase/auth";
import { toZenkaku } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ contentSlug: string; sectionSlug: string }>;
}): Promise<Metadata> {
  const { contentSlug } = await params;
  const { contents, totalCount } = await getContents({
    filters: "slug[equals]" + contentSlug,
  });

  if (totalCount !== 1) return {};

  return {
    title: contents[0].title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ chapterSlug: string; contentSlug: string }>;
}) {
  await verifyUserStatus("student");

  const { contentSlug } = await params;
  const { contents, totalCount } = await getContents({
    filters: "slug[equals]" + contentSlug,
  });

  if (totalCount === 0) notFound();

  const post = contents[0];

  return (
    <Navigation>
      <div className="mx-auto max-w-xl py-8">
        <p className={"mb-2 text-sm text-neutral-700"}>
          {`${toZenkaku(post.chapter.number)}章 ${post.chapter.title} /`}
        </p>
        <h2 className="mb-16 text-xl">{`${toZenkaku(post.number)}. ${post.title}`}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="flex flex-col gap-4 [&>*:first-child]:m-0 [&>:is(h1,h2,h3)]:mt-8 [&>h1]:text-xl [&>h1]:font-bold"
        />
      </div>
    </Navigation>
  );
}
