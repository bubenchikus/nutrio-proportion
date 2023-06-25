import Head from "next/head";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import barIcon from "../public/barIcon.svg";
import Link from "next/link";

const Header = ({ loggedIn, setLoggedIn, router, setUserData }) => {
  return (
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
              localStorage.removeItem("token");
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
  );
};

export default Header;
