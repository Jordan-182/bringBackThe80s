import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.globalHeader}>
      <Image
        src="/logo.png"
        alt="Logo du site"
        width={120}
        height={120}
        className={styles.logo}
      />
      <p>Tommy Vercetti</p>
    </header>
  );
}
