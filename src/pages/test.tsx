import { type NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const { data: session } = useSession();
  //   const { data: test } = trpc.tba.fetchEventRobots.useQuery();
  //   const { data: two } = trpc.tba.getTBAData.useQuery();
  // const { data: two } = trpc.tba.fetchDistrictEvents.useQuery();
  trpc.auth.uploadScouters.useQuery();

  return <></>;
};

export default Home;

// {
//     "city": "Snohomish",
//     "country": "USA",
//     "district": null,
//     "end_date": "2023-03-05",
//     "event_code": "wasno",
//     "event_type": 1,
//     "key": "2023wasno",
//     "name": "PNW District Glacier Peak Event",
//     "start_date": "2023-03-03",
//     "state_prov": "WA",
//     "year": 2023
//   },
