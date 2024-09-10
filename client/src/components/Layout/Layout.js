import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({
  children,
  description = "Best e shopping",
  keywords = "mobile, watch, belt",
  author = "balvesh",
  title = "EShopee | Mega offers",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <ToastContainer />
      <main className="admin-layout-main">
        {children}
      </main>
      <Footer />
    </>
  );
};

// Layout.defaultProps = {
//   title: "E-Shopee- mega shop",
//   describe: "Best e shop",
//   keywords: "mobile, laptop",
//   author: "Balvesh",
// };

export default Layout;
