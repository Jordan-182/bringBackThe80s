import { articleMessages } from "@/data/articleMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addArticle(article: {
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  category_id: number;
  author_id: number;
}) {
  const res = await fetch(apiRoutes.ARTICLES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  if (!res.ok) throw new Error(articleMessages.addFail);
  return res.json();
}
