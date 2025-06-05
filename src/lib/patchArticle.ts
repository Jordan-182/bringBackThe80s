import { apiRoutes } from "@/data/ROUTES";
import { articleMessages } from "@/data/articleMessages";
import { ArticleModel } from "@/model/ArticleModel";

export async function patchArticle(
  article: ArticleModel
): Promise<{ message: string }> {
  const res = await fetch(apiRoutes.ARTICLES, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(article),
  });

  if (res.status === 404) {
    throw new Error(articleMessages.notFound || "Article non trouvé");
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const errMsg = (data as { error?: string }).error || articleMessages.error;
    throw new Error(errMsg);
  }

  return res.json();
}
