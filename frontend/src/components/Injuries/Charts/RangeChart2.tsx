import { Box, Flex, Grid, Input } from "@chakra-ui/react";
import { Channel, Epg, Layout, Program, useEpg } from "planby";
import React from "react";
import { fetchEpg } from "./Timeline/helpers/common";
import { theme } from "./Timeline/helpers/theme";

export const RangeChart2 = ({ playerId }: any) => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const epg = await fetchEpg(playerId);
    const channels = [
      {
        uuid: "1",
      },
    ];

    console.log(epg, channels);
    setEpg(epg as Program[]);
    setChannels(channels as Channel[]);
    setIsLoading(false);
  }, []);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 7200,
    itemHeight: 100,
    isSidebar: false,
    isTimeline: true,
    startDate:
      new Date(selectedDate).toISOString().substring(0, 10) + "T07:00:00",
    endDate:
      new Date(selectedDate).toISOString().substring(0, 10) + "T23:00:00",
    isBaseTimeFormat: true,
    theme: theme,
  });

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return (
    <>
      <Flex flexDir="row-reverse" p="1em">
        {selectedDate && (
          <Input
            maxW="300px"
            type="date"
            value={new Date().toISOString().substring(0, 10)}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
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
