import type {MicroCMSDate, MicroCMSQueries,} from "microcms-js-sdk";
import {createClient} from "microcms-js-sdk";

//ブログの型定義
export type Content = {
  id: string;
  chapter: Chapter;
  section: number;
  title: string;
  content: string;
} & MicroCMSDate;

export type Chapter = {
  id: string;
  title: string;
  number: number;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getChapters = async (queries?: MicroCMSQueries) => {
  return await client.getList<Chapter>({
    endpoint: "chapters",
    queries,
  })
}

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  return await client.getList<Content>({
    endpoint: "contents",
    queries,
  });
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Content>({
    endpoint: "contents",
    contentId,
    queries,
  });
};