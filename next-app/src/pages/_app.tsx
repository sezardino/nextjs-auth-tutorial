import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...rest },
}: AppProps) {
  return (
    // <ApolloProvider client={getClient()}>
    <SessionProvider session={session}>
      <main>
        <Header />

        <Component {...rest} />
      </main>
    </SessionProvider>
    // </ApolloProvider>
  );
}
