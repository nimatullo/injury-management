import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import ApiService from "../../services/ApiService";
import timelineTheme from "../../assets/timelineTheme";
import moment from "moment";

export const RangeChart = ({ playerId }: any) => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [Appointments, setAppointments] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [selectedDate, setSelectedDate] = React.useState<string>(
    moment().format("YYYY-MM-DD")
  );

  const channelsData = React.useMemo(() => channels, [channels]);
  const appointmentsData = React.useMemo(() => Appointments, [Appointments]);

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const appointments = await ApiService.getAppointmentsForTimeline(playerId);

    const channels = appointments.map((appointment: any, index: number) => {
      return {
        uuid: index.toString(),
      };
    });

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
    startDate: moment(selectedDate).format("YYYY-MM-DD") + "T07:00:00",
    endDate: moment(selectedDate).format("YYYY-MM-DD") + "T23:00:00",
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
              onChange={(e) =>
                setSelectedDate(moment(e.target.value).format("YYYY-MM-DD"))
              }
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
