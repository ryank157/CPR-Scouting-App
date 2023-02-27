import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Button from "src-components/button";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: test } = trpc.tba.getTBAData.useQuery();
  console.log(test)


  return (
    <>
      <Head>
        <title>CPR Scouting App</title>
        <meta name="description" content="CPR scouting app for 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <div className="max-w-screen flex h-screen flex-col items-center ">
        {/* {!session && (
          <>
            <h1 className="mt-16 p-4 text-center text-6xl font-normal ">
              Welcome!
            </h1>
            <div className="mb-16 flex flex-col flex-wrap items-center p-4 text-cpr-blue">
            <Button onClick={() => signIn('discord')}>Discord Login</Button>
             
            <Button className="mt-10">Continue as Guest</Button>
            </div>
          </>
        )} */}
        
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

      {/* <main className="flex h-screen flex-col items-center justify-center border border-black ">
        <div>{session?.user?.name}</div>

        <button
          type="button"
          onClick={() => (session ? signOut() : signIn("discord"))}
          className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        >
          Sign {session ? "Out" : "In"}
        </button>
      </main> */}
    </>
  );
};

export default Home;