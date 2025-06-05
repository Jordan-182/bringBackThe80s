import { getall } from "@/service/ArticleService";
import Articles from "@/ui/Articles";
import styles from "./ArticlesPage.module.css";

export default async function ArticlesPage() {
  const articles = await getall();
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Articles</h1>
      <div>
        <Articles articles={articles} />
      </div>
    </main>
  );
}
