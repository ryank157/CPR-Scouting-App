import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Button from "src-components/button";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: test } = trpc.tba.getTBAData.useQuery();
  
  return (
    <>
      <Head>
        <title>CPR Scouting App</title>
        <meta name="description" content="CPR scouting app for 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen flex h-screen flex-col items-center ">       
          <div className="w-75 mb-16 flex h-screen flex-col flex-wrap items-stretch justify-between p-4  text-cpr-blue">
            <div className="w-full">
              <Link href="/schedule">
              <Button className="mt-10">Match Schedule</Button>
              </Link>
              <Button className="mt-10">Scoreboard</Button>
              <Link href="/matchScout">
              <Button className="mt-10">Start Scouting</Button>
              </Link>
            </div>
            <Button onClick={() => signOut()}>Sign Out</Button>
           
          </div>
      </div>

    </>
  );
};

export default Home;
