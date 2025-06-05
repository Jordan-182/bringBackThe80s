import { articleMessages } from "@/data/articleMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getArticles() {
  const res = await fetch(apiRoutes.ARTICLES, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(articleMessages.error);
  return res.json();
}
