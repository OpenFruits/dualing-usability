import "../src/style/index.css";

import type { CustomAppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const MyApp = (props: CustomAppProps) => {
  const getLayout =
    props.Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <Head>
        <meta name="description" content="Starter Template by Next.js and TailwindCSS." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      {getLayout(<props.Component {...props.pageProps} />)}
    </>
  );
};

export default MyApp;
