import Head from "next/head";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import barIcon from "../public/barIcon.svg";

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
        <div className={styles.logoBox}>
          <Image src={barIcon} className={styles.image} />
          <div className={styles.textLogo}>Nutrio-proportion</div>
        </div>
        <div></div>
        <div className={styles.gridLink}>Main page</div>
        <div className={styles.gridLink}>Me</div>
        <div className={styles.gridLink}>Favourites</div>
        <div className={styles.gridLink}>Logout</div>
      </div>
    </>
  );
};

export default Header;
