import { useState } from "react";
import { type NextPage } from "next";

const MatchScout: NextPage = () => {
  const [count, setCount] = useState(0);

  return (
    <form className="flex w-1/4 flex-col items-center justify-center">
      <div className=" mb-2 text-white">High Make</div>
      <div className="flex items-center justify-center">
        <button
          className="h-8 w-8 rounded-l bg-blue-500 font-bold text-white hover:bg-blue-700"
          type="button"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <div className="color-white mx-2 flex h-8 w-8 items-center justify-center rounded bg-white px-2 text-center text-cpr-blue">
          {count}
        </div>
        <button
          className="h-8 w-8 rounded-r bg-blue-500 font-bold text-white hover:bg-blue-700"
          type="button"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </form>
  );
};

export default MatchScout;
