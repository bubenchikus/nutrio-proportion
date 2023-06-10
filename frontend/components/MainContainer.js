import Head from "next/head";

const MainContainer = ({ children, keywords }) => {
  return (
    <>
      <Head>
        <meta keywords={"keyword, search, optimization" + keywords}></meta>
        <title>Main page</title>
      </Head>
      <div className="navbar">
        <style jsx>
          {`
            .navbar {
              display: flex;
              flex-direction: row;
              background: orange;
              padding: 15px;
            }
          `}
        </style>
      </div>
      <div>{children}</div>
    </>
  );
};

export default MainContainer;
