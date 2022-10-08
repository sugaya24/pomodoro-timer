import type { AppProps } from "next/app";
import React from "react";

import {
  AuthProvider,
  TasksContextProvider,
  TimerContextProvider,
} from "../contexts";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TasksContextProvider>
        <TimerContextProvider>
          <Component {...pageProps} />
        </TimerContextProvider>
      </TasksContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
