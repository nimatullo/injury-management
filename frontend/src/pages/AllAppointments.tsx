import moment from "moment";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import ApiService from "../services/ApiService";
import timelineTheme from "../assets/timelineTheme";
import { Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { PlayerTimelineItem } from "../components/Appointments/PlayerTimelineItem";
import { CalendarView } from "../components/Appointments/CalendarView";

export const AllAppointments = () => {
  const [players, setPlayers] = React.useState<Channel[]>([]);
  const [appointments, setAppointments] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [date, setDate] = React.useState(new Date());

  const handleFetchResources = async () => {
    setIsLoading(true);
    const formattedDate = new Date(date);
    const apps = await ApiService.getAppointments(formattedDate.toISOString());
    const players = apps
      .reduce((acc: any, appointment: any) => {
        if (
          !acc.find(
            (channel: any) => channel.channelUuid === appointment.channelUuid
          )
        ) {
          acc.push(appointment);
        }
        return acc;
      }, [])
      .map((appointment: any) => {
        return appointment.channel;
      });

    setAppointments(apps as Program[]);
    setPlayers(players as Channel[]);
    setIsLoading(false);
  };

  const getBeginningOfDay = (date: Date) => {
    return moment(date).startOf("day").toDate();
  };

  const getEndOfDay = (date: Date) => {
    return moment(date).endOf("day").toDate();
  };

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: players,
    epg: appointments,
    dayWidth: 7200,
    itemHeight: 100,
    isSidebar: true,
    isTimeline: true,
    startDate: getBeginningOfDay(date),
    endDate: getEndOfDay(date),
    isBaseTimeFormat: true,
    theme: timelineTheme,
  });

  React.useEffect(() => {
    handleFetchResources();
  }, [date]);

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <GridItem h="100vh" colSpan={4}>
        {appointments.length > 0 ? (
          <Epg isLoading={isLoading} {...getEpgProps()}>
            <Layout
              {...getLayoutProps()}
              renderChannel={({ channel }) => (
                <PlayerTimelineItem key={channel.uuid} channel={channel} />
              )}
            />
          </Epg>
        ) : (
          <Center
            h="100vh"
            flexDirection="column"
            borderRight="1px solid #e2e8f0"
          >
            <Heading mb="5">No Appointments</Heading>
            <Text maxW="500px" textAlign="center">
              You have no appointments scheduled for this day. Click "Schedule
              New Appointment" to schedule an appointment.
            </Text>
          </Center>
        )}
      </GridItem>
      <GridItem w="20vw">
        <CalendarView date={date} setDate={setDate} />
      </GridItem>
    </Grid>
  );
};
