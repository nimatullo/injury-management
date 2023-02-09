import { Stack, Text } from "@chakra-ui/react";
import { Channel, ChannelBox, ChannelLogo } from "planby";
import React from "react";

interface ChannelItemProps {
  channel: Channel;
}

export const PlayerTimelineItem = ({ channel }: ChannelItemProps) => {
  React.useEffect(() => {
    console.log(channel);
  }, []);

  const { position, logo, title } = channel;
  return (
    <ChannelBox {...position}>
      <Stack alignItems="center">
        <ChannelLogo src={logo} alt="Logo" />
        {/* <Text>{title.split(" ")[1]}</Text> */}
      </Stack>
    </ChannelBox>
  );
};
