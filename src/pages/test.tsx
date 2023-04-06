import { eventStore } from "@/utils/stores";
import { type NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { currentEvent } = eventStore();

  // const { data: session } = useSession();
  // const event = { eventKey: "2023orsal", eventId: 7 };
  // const { data: test } = trpc.tba.populateRobots.useQuery(event);
  // const { data: two } = trpc.tba.populateMatchSchedule.useQuery(event);

  // const { data: two } = trpc.tba.getTBAData.useQuery();
  // const { data: data } = trpc.match.exportData.useQuery();
  // trpc.auth.uploadScouters.useQuery();
  // const { data: match } = trpc.test.fetchMatchData.useQuery();
  // trpc.tba.removeAllData.useQuery();

  return <div>Hello</div>;
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
