import moment from "moment";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import ApiService from "../services/ApiService";
import timelineTheme from "../assets/timelineTheme";
import { Grid, GridItem } from "@chakra-ui/react";
import { PlayerTimelineItem } from "../components/Appointments/PlayerTimelineItem";
import { CalendarView } from "../components/Appointments/CalendarView";

export const AllAppointments = () => {
  const [players, setPlayers] = React.useState<Channel[]>([]);
  const [appointments, setAppointments] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [date, setDate] = React.useState(new Date());

  const handleFetchResources = async () => {
    setIsLoading(true);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const apps = await ApiService.getAppointments(formattedDate);
    console.log(apps);
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

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: players,
    epg: appointments,
    dayWidth: 7200,
    itemHeight: 100,
    isSidebar: true,
    isTimeline: true,
    startDate: moment(date).format("YYYY-MM-DD") + "T07:00:00",
    endDate: moment(date).format("YYYY-MM-DD") + "T23:00:00",
    isBaseTimeFormat: true,
    theme: timelineTheme,
  });

  React.useEffect(() => {
    handleFetchResources();
  }, [date]);

  return (
    <Grid templateColumns="3fr 1fr">
      {/* <Input
        type="date"
        value={date}
        onChange={(e) => setDate(moment(e.target.value).format("YYYY-MM-DD"))}
      /> */}

      <GridItem width="80vw" h="100vh">
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderChannel={({ channel }) => (
              <PlayerTimelineItem key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </GridItem>
      <GridItem w="20vw">
        <CalendarView date={date} setDate={setDate} />
      </GridItem>
    </Grid>
  );
};
