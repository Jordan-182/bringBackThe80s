import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          src="/logo.png"
          alt="Logo du site"
          width={400}
          height={400}
          className={styles.logo}
        />

        <Link href={"/articles"} className={styles.link}>
          Découvrir
        </Link>
      </main>
    </div>
  );
}
