import { articleMessages } from "@/data/articleMessages";
import { apiRoutes } from "@/data/ROUTES";
import { ArticleModel } from "@/model/ArticleModel";

export async function getOne(id: number): Promise<ArticleModel> {
  const res = await fetch(`${apiRoutes.ARTICLES}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(articleMessages.notFound || "Article non trouvé");
  }

  if (!res.ok) {
    throw new Error(articleMessages.error);
  }

  return res.json();
}
