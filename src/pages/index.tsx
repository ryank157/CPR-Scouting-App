import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Button from "src-components/button";
import { scheduleStore } from "@/utils/stores";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CPR Scouting App</title>
        <meta name="description" content="CPR scouting app for 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <div className="max-w-screen flex h-screen flex-col items-center ">
        <div className="w-75 text-cpr-blue mb-16 flex h-screen flex-col flex-wrap items-stretch justify-between  p-4">
          <div className="flex w-full flex-col ">
            <Link href="/schedule">
              <Button className="mt-10 w-80">Match Schedule</Button>
            </Link>
            <Link href="/login">
              <Button className="mt-10 w-80">Login</Button>
            </Link>
            <Link href="/matchScout">
              <Button className="mt-10 w-80">Start Scouting</Button>
            </Link>
            <Link href="/data">
              <Button className="mt-10 w-80">Manage Data</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
