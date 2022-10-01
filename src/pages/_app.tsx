import type { AppProps } from "next/app";
import React from "react";

import { AuthProvider, TasksContextProvider } from "../contexts";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TasksContextProvider>
        <Component {...pageProps} />
      </TasksContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
