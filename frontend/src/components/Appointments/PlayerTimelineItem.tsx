import { Avatar, Stack, Text } from "@chakra-ui/react";
import { Channel, ChannelBox } from "planby";

interface ChannelItemProps {
  channel: Channel;
}

export const PlayerTimelineItem = ({ channel }: ChannelItemProps) => {
  const { position, logo, title } = channel;
  return (
    <ChannelBox {...position}>
      <Stack alignItems="center" w="100%" p="1em">
        <Avatar
          size="lg"
          name={title.split(" ")[1]}
          src={logo}
          bg="transparent"
          border="1px solid lightgray"
        />
        <Text color="gray.600" fontSize="lg" fontWeight="bold">
          {title.split(" ")[1]}
        </Text>
      </Stack>
    </ChannelBox>
  );
};
