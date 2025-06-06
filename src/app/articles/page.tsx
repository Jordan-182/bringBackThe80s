import { getall } from "@/service/ArticleService";
import Articles from "@/ui/Articles";
import Image from "next/image";
import styles from "./ArticlesPage.module.css";

export default async function ArticlesPage() {
  const articles = await getall();
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.avatarContainer}>
          <Image src={"/avatar.webp"} alt="avatar" width={100} height={100} />
        </div>
        <div className={styles.introText}>
          <p>
            <strong>Bienvenue sur le ViceBlog,</strong> le journal non-officiel
            — et totalement incontrôlable — de Tommy Vercetti, parrain
            autoproclamé de Vice City.
          </p>
          <p>
            Ici, pas de langue de bois, pas de censure. Juste un concentré brut
            de ce que c’est que de <em>vivre, survivre et régner</em> dans la
            ville la plus décadente et dangereusement stylée de Floride.
          </p>
          <p>
            Entre business, trahisons, bolides, musique new wave et coups
            tordus, tu vas découvrir Vice City à travers les yeux de celui qui
            l’a conquise rue par rue.
          </p>
          <p>
            <em>
              Prends une bière, mets du synthwave en fond, et choisis ton
              article.
            </em>
          </p>
        </div>
      </div>
      <h1 className={styles.title}>Tous mes articles</h1>
      <div>
        <Articles articles={articles} />
      </div>
    </main>
  );
}
