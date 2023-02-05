import { useState } from "react";
import { type NextPage } from "next";
import Link from "next/link";

const Schedule: NextPage = () => {
  const [count, setCount] = useState(0);

  return (
    <>
    <Link href="/home">Go Back</Link>
    <div className="">Schedule</div>
    </>
  );
};

export default Schedule;
