import { Grid, GridItem } from "@chakra-ui/react";
import { ChatDemo } from "../components/Dashboard/ChatDemo";
import { PinnedPlayers } from "../components/Dashboard/PinnedPlayers";
import { TodayAppointments } from "../components/Dashboard/TodayAppointments";
import { UpcomingGame } from "../components/Dashboard/UpcomingGame";

import { TeamInjurySummary } from "../components/Injuries/TeamInjurySummary";

export const Dashboard = () => {
  return (
    <>
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={4}
        h="100vh"
        p="1em"
        w="100%"
      >
        <GridItem rowSpan={5} colSpan={2}>
          <PinnedPlayers />
        </GridItem>
        <GridItem rowSpan={7}>
          <TodayAppointments />
        </GridItem>
        <GridItem rowSpan={7}>
          <ChatDemo />
        </GridItem>
        <GridItem rowSpan={3} colSpan={2}>
          <TeamInjurySummary />
        </GridItem>
        <GridItem colSpan={2}>
          <UpcomingGame />
        </GridItem>
      </Grid>
    </>
  );
};
