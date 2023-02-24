import moment from "moment";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import ApiService from "../services/ApiService";
import timelineTheme from "../assets/timelineTheme";
import { Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { PlayerTimelineItem } from "../components/Appointments/PlayerTimelineItem";
import { CalendarView } from "../components/Appointments/CalendarView";
import { AppointmentTimelineItem } from "../components/Appointments/AppointmentTimelineItem";

export const AllAppointments = () => {
  const [players, setPlayers] = React.useState<Channel[]>([]);
  const [appointments, setAppointments] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [date, setDate] = React.useState(new Date());

  const startDate = React.useMemo(() => {
    return moment(date).startOf("day").toDate();
  }, [date]);

  const endDate = React.useMemo(() => {
    return moment(date).endOf("day").toDate();
  }, [date]);

  const handleFetchResources = async () => {
    setIsLoading(true);
    const formattedDate = new Date(date);
    const apps = await ApiService.getAppointments(formattedDate.toISOString());
    const players = apps
      .reduce((acc: Channel[], appointment: Channel) => {
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

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: players,
    epg: appointments,
    dayWidth: 7200,
    itemHeight: 100,
    isSidebar: true,
    isTimeline: true,
    startDate: startDate,
    endDate: endDate,
    isBaseTimeFormat: true,
    theme: timelineTheme,
  });

  React.useEffect(() => {
    handleFetchResources();

    return () => {
      setAppointments([]);
      setPlayers([]);
    };
  }, [date]);

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <GridItem h="100vh" colSpan={4}>
        {appointments.length > 0 && getEpgProps ? (
          <Epg isLoading={isLoading} {...getEpgProps()}>
            <Layout
              {...getLayoutProps()}
              renderChannel={({ channel }) => (
                <PlayerTimelineItem key={channel.uuid} channel={channel} />
              )}
              renderProgram={({ program, ...rest }) => (
                <AppointmentTimelineItem
                  key={program.data.id}
                  program={program}
                  cb={handleFetchResources}
                  {...rest}
                />
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
      <GridItem h="100vh" w="20vw" overflowY="auto">
        <CalendarView
          timelineFetchCallback={handleFetchResources}
          date={date}
          setDate={setDate}
        />
      </GridItem>
    </Grid>
  );
};
