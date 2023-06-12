import Head from "next/head";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import barIcon from "../public/barIcon.svg";
import Link from "next/link";

const Header = ({ children, keywords }) => {
  return (
    <>
      <Head>
        <meta keywords={"keyword, search, optimization" + keywords}></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <title>Nutrio-proportion</title>
      </Head>
      <div className={styles.grid}>
        <Link className={styles.logoBox} href="/">
          <Image src={barIcon} className={styles.image} />
          <div className={styles.textLogo}>Nutrio-proportion</div>
        </Link>
        <div></div>
        <Link className={styles.gridLink} href="/">
          Main page
        </Link>
        <Link className={styles.gridLink} href="/me">
          Me
        </Link>
        <Link className={styles.gridLink} href="/me/favourites">
          Favourites
        </Link>
        <Link className={styles.gridLink} href="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Header;
