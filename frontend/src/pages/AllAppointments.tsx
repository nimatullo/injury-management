import moment from "moment";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import ApiService from "../services/ApiService";
import timelineTheme from "../assets/timelineTheme";
import { Box, Input } from "@chakra-ui/react";
import { PlayerTimelineItem } from "../components/Appointments/PlayerTimelineItem";

export const AllAppointments = () => {
  const [players, setPlayers] = React.useState<Channel[]>([]);
  const [appointments, setAppointments] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));

  const channelsData = React.useMemo(() => players, [players]);
  const appointmentsData = React.useMemo(() => appointments, [appointments]);

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const apps = await ApiService.getAppointments(date);
    const players = apps.map((appointment: any) => {
      return {
        uuid: appointment.channelUuid,
      };
    });

    setAppointments(apps as Program[]);
    setPlayers(players as Channel[]);
    console.log("Running...");
    setIsLoading(false);
  }, []);

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
    <Box h="100%">
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(moment(e.target.value).format("YYYY-MM-DD"))}
      />

      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderChannel={({ channel }) => (
            <PlayerTimelineItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </Box>
  );
};
