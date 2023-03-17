import { useState, useEffect } from "react";
import { trpc } from "./trpc";
import userStore, { scheduleStore } from "./stores";

const FetchAllData = () => {
  const { users, setUsers } = userStore();
  const { schedule, setSchedule } = scheduleStore();

  trpc.tba.fetchMatchSchedule.useQuery(undefined, {
    enabled: schedule.length === 0,
    onSuccess(res) {
      res.sort((a, b) => a.matchNumber - b.matchNumber);
      //Put in schedule store
      setSchedule(res);
    },
  });

  trpc.auth.fetchScouters.useQuery(undefined, {
    enabled: users.length === 0,
    onSuccess(res) {
      setUsers(res);
    },
  });

  return null;
};

export default FetchAllData;
