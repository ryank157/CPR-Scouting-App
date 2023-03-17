import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // Disable SSR for all pages
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
  });

  return (
    <SessionProvider session={session}>
      <DynamicComponent {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
