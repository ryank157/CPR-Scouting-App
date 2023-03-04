import { type NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const { data: session } = useSession();
  const { data: test } = trpc.tba.fetchEventRobots.useQuery();

  return <></>;
};

export default Home;
