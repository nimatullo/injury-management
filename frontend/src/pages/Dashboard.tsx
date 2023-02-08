import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { ChatDemo } from "../components/Dashboard/ChatDemo";
import { TodayAppointments } from "../components/Dashboard/TodayAppointments";
import { UpcomingGame } from "../components/Dashboard/UpcomingGame";

import { TeamInjurySummary } from "../components/Injuries/TeamInjurySummary";
import { NewInjuryButton } from "../components/NewInjury/NewInjuryButton";
import ApiService from "../services/ApiService";

export const Dashboard = () => {
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={4}
      h="100vh"
      p="1em"
    >
      <GridItem rowSpan={1} colSpan={2}>
        <Text>
          Hello, <strong>Doctor</strong>
        </Text>
        <Text>
          <NewInjuryButton />
        </Text>
      </GridItem>
      <GridItem rowSpan={2}>
        <TodayAppointments />
      </GridItem>
      <GridItem rowSpan={2}>
        <ChatDemo />
      </GridItem>
      <GridItem rowSpan={2} colSpan={2}>
        <TeamInjurySummary />
      </GridItem>
      <GridItem colSpan={2}>
        <UpcomingGame />
      </GridItem>
    </Grid>
  );
};
