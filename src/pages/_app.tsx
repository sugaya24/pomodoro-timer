import type { AppProps } from "next/app";
import React from "react";

import { TasksContextProvider } from "../contexts/Tasks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TasksContextProvider>
      <Component {...pageProps} />
    </TasksContextProvider>
  );
}

export default MyApp;
