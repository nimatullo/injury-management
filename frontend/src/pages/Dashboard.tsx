import * as React from "react";

import { TeamInjurySummary } from "../components/Injuries/TeamInjurySummary";
import { NewInjuryButton } from "../components/NewInjury/NewInjuryButton";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <NewInjuryButton />
      <TeamInjurySummary />
    </div>
  );
};
