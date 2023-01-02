import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

import Navbar from "src-components/Navbar";

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
            <h1 className="mt-16 p-4 text-center text-6xl font-normal text-white">
              Welcome
            </h1>
            <div className="mb-16 flex flex-col flex-wrap items-center p-4 text-cpr-blue">
              <button
                className="text-l w-full rounded-md bg-white px-8 py-2 font-bold shadow-md"
                onClick={() => signIn("discord")}
              >
                Discord Login
              </button>
              <button className="text-l mt-8 w-full rounded-md bg-white px-8 py-2 font-bold shadow-md">
                Continue as Guest
              </button>
            </div>
          </>
        )}
        {session && (
          <div className="w-75 mb-16 flex h-screen flex-col flex-wrap items-center justify-between p-4 text-cpr-blue">
            <div className="w-full">
              <button className="text-l mt-20 w-full rounded-md bg-white  py-2 font-bold shadow-md">
                Match Schedule
              </button>
              <button className="text-l mt-10 w-full rounded-md bg-white  py-2 font-bold shadow-md">
                Scoreboard
              </button>
              <button className="text-l mt-10 w-full rounded-md bg-white  py-2 font-bold shadow-md">
                Start Scouting
              </button>
            </div>
            <button
              className="text-l mt-8 w-full justify-end rounded-md bg-white  py-2 font-bold shadow-md "
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
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
