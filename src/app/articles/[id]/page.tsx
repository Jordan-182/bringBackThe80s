import { articleMessages } from "@/data/articleMessages";
import { ArticleModel } from "@/model/ArticleModel";
import { getOneById } from "@/service/ArticleService";
import Image from "next/image";
import Link from "next/link";
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
      <Link href={"/articles"} className={styles.back}>
        &#8617; Retour aux articles
      </Link>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={article.image_path}
            className={styles.articleImage}
            alt="Illustration de l'article"
            width={500}
            height={200}
          />
        </div>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.date}>
          Posté le {article.created_at} par Tommy Vercetti
        </p>
        <p
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
