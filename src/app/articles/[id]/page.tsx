import { articleMessages } from "@/data/articleMessages";
import { ArticleModel } from "@/model/ArticleModel";
import { getOneById } from "@/service/ArticleService";
import { notFound } from "next/navigation";
import styles from "./ArticleDetail.module.css";

interface PageParams {
  params: {
    id: string;
  };
}

export default async function ArticleDetailPage({ params }: PageParams) {
  const idNum = parseInt(params.id, 10);
  if (isNaN(idNum)) {
    notFound();
  }

  let article: ArticleModel;
  try {
    article = await getOneById(idNum);
  } catch (err: unknown) {
    console.error(articleMessages.errorDetail, err);
    return notFound();
  }

  return (
    <main className={styles.container}>
      <h1>Détails de l’article #{article.id}</h1>
      <article className={styles.card}>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
      </article>
    </main>
  );
}
