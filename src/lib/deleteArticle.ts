import { articleMessages } from "@/data/articleMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteArticle(id: number) {
  const res = await fetch(`${apiRoutes.ARTICLES}?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(articleMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
