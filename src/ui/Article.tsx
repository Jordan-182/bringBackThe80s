"use client";

import { appRoutes } from "@/data/ROUTES";
import { ArticleModel } from "@/model/ArticleModel";
import Image from "next/image";
import Link from "next/link";
import styles from "./Article.module.css";

export default function Article({ article }: { article: ArticleModel }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={article.image_path}
          className={styles.articleImage}
          alt="Illustration de l'article"
          width={300}
          height={150}
        />
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.date}>
          Posté le {article.created_at} par Tommy Vercetti
        </p>
        <Link href={appRoutes.ARTICLES_ID(article.id)} className={styles.link}>
          Lire article
        </Link>
      </div>
    </article>
  );
}
