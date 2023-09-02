//  Note: This file is used to override the default Next.js App component.

import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>TextMe</title>
        <link rel="shortcut icon" href="/logo.svg" />
      </Head>
      <Component {...pageProps} />
    </StateProvider>
  );
}
