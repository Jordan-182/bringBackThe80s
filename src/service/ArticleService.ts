import { addArticle } from "@/lib/addArticle";
import { deleteArticle } from "@/lib/deleteArticle";
import { getOne } from "@/lib/getArticle";
import { getArticles } from "@/lib/getArticles";
import { patchArticle } from "@/lib/patchArticle";
import { ArticleModel } from "@/model/ArticleModel";

export async function getall() {
  return getArticles();
}

export async function getOneById(id: number): Promise<ArticleModel> {
  return getOne(id);
}

export async function deleteOne(id: number) {
  return deleteArticle(id);
}

export async function addOne(article: Omit<ArticleModel, "id">) {
  return addArticle(article);
}

export async function editOne(
  article: ArticleModel
): Promise<{ message: string }> {
  return patchArticle(article);
}
