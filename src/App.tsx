import css from "./App.module.css";
import CafeInfo from "./components/CafeInfo/CafeInfo.tsx";
import VoteStats from "./components/VoteStats/VoteStats.tsx";
import VoteOptions from "./components/VoteOptions/VoteOptions.tsx";
import { useState } from "react";
import type { Votes, VoteType } from "./types/votes.ts";
import Notification from "./components/Notification/Notification.tsx";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onVote = (type: VoteType) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const onReset = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={onVote} onReset={onReset} canReset={!!totalVotes} />
      {totalVotes ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
