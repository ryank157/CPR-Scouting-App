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
      {/* <Navbar /> */}
      <div className="max-w-screen flex h-screen flex-col items-center ">
        {!session && (
          <>
            <h1 className="mt-16 p-4 text-center text-6xl font-normal ">
              Welcome!
            </h1>
            <div className="mb-16 flex flex-col flex-wrap items-center p-4 text-cpr-blue">
            <Button className='w-80' onClick={() => signIn('discord')}>Discord Login</Button>
             
              <Button className="mt-10 w-80">Continue as Guest</Button>
            </div>
          </>
        )}
        {session && (
          <div className="w-75 mb-16 flex h-screen flex-col flex-wrap items-stretch justify-between p-4  text-cpr-blue">
            <div className="w-full flex flex-col ">
              <Link href="/schedule">
              <Button className="mt-10 w-80">Match Schedule</Button>                
              </Link>
              <Button className="mt-10 w-80" >Scoreboard</Button>
              <Link href="/matchScout">
              <Button className="mt-10 w-80">Start Scouting</Button>
              </Link>
            </div>
            <Button className='w-80' onClick={() => signOut()}>Sign Out</Button>
           
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
