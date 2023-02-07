import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import ApiService from "../../services/ApiService";
import timelineTheme from "../../assets/timelineTheme";

export const RangeChart = ({ playerId }: any) => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [Appointments, setAppointments] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  const channelsData = React.useMemo(() => channels, [channels]);
  const appointmentsData = React.useMemo(() => Appointments, [Appointments]);

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const appointments = await ApiService.getAppointmentsForTimeline(playerId);
    const channels = [
      {
        uuid: "1",
      },
    ];

    setAppointments(appointments as Program[]);
    setChannels(channels as Channel[]);
    setIsLoading(false);
  }, []);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: appointmentsData,
    dayWidth: 7200,
    itemHeight: 100,
    isSidebar: false,
    isTimeline: true,
    startDate:
      new Date(selectedDate).toISOString().substring(0, 10) + "T07:00:00",
    endDate:
      new Date(selectedDate).toISOString().substring(0, 10) + "T23:00:00",
    isBaseTimeFormat: true,
    theme: timelineTheme,
  });

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return (
    <>
      <Flex flexDir="row" justifyContent="right" p="1em" alignItems="center">
        {selectedDate && (
          <Flex flexDir="column" px="1em">
            <FormLabel>Appointment Date</FormLabel>
            <Input
              maxW="300px"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Flex>
        )}
      </Flex>
      <Box h="500px" p="1em">
        <Epg isLoading={isLoading} {...getEpgProps()}>
          <Layout {...getLayoutProps()} />
        </Epg>
      </Box>
    </>
  );
};
