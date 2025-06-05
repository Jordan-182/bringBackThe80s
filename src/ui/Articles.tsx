"use client";
import { ArticleModel } from "@/model/ArticleModel";
import Article from "@/ui/Article";
import styles from "./Articles.module.css";

export default function Articles({ articles }: { articles: ArticleModel[] }) {
  return (
    <ul className={styles.articlesList}>
      {articles.map((article: ArticleModel) => (
        <li key={article.id}>
          <Article article={article} />
        </li>
      ))}
    </ul>
  );
}
