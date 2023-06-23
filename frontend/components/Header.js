import Head from "next/head";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import barIcon from "../public/barIcon.svg";
import Link from "next/link";

const Header = ({ keywords, loggedIn, setLoggedIn, router, setUserData }) => {
  return (
    <>
      <Head>
        <meta
          keywords={"nutrio-proportion, nutrition, foods-rating" + keywords}
        ></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;400;500&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/public/images/site.webmanifest" /> */}

        <title>Nutrio-proportion</title>
      </Head>
      <div className={styles.grid}>
        <Link className={styles.logoBox} href="/">
          <Image src={barIcon} className={styles.image} alt="logo" />
          <div className={styles.textLogo}>Nutrio-proportion</div>
        </Link>
        <div></div>
        {loggedIn ? (
          <>
            <Link className={styles.gridLink} href="/">
              Main page
            </Link>
            <Link className={styles.gridLink} href="/me">
              Me
            </Link>
            <Link className={styles.gridLink} href="/me/favourites">
              Favourites
            </Link>
            <div
              className={styles.gridLink}
              onClick={(e) => {
                e.preventDefault();
                router.push("/login");
                setUserData({});
                setLoggedIn(false);
              }}
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <div className={styles.gridLink}></div>
            <div className={styles.gridLink}></div>
            <Link className={styles.gridLink} href="/">
              Main page
            </Link>
            <Link className={styles.gridLink} href="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
