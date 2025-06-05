import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.globalHeader}>
      <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="Logo du site"
          width={120}
          height={120}
          className={styles.logo}
        />
      </Link>
      <p>Tommy Vercetti</p>
    </header>
  );
}
