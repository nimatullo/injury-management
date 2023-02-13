import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Progress,
  ProgressLabel,
  Stack,
  Text,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ApiService from "../../services/ApiService";
import { ApiResponse, Player } from "../../services/types";

export const PinnedPlayers = () => {
  const [players, setPlayers] = React.useState<any>([]);

  React.useEffect(() => {
    const endpoint = `players/random`;
    ApiService.get(endpoint).then((res: ApiResponse<Player[]>) => {
      if (res.status === 200) {
        setPlayers(res.data.splice(0, 3));
      }
    });
  }, []);

  return (
    players.length > 0 && (
      <Box>
        <HStack alignItems="baseline">
          <Heading size="md" mb="5">
            Recovery Tracking
          </Heading>
          <Tooltip
            label="This evaluates the player's performance prior to the injury and determines their progress towards returning to that level of play."
            aria-label="This evaluates the player's performance prior to the injury and determines their progress towards returning to that level of play."
            bg="black"
          >
            <span>
              <Icon as={BsFillInfoCircleFill} color="black" boxSize="3" />
            </span>
          </Tooltip>
        </HStack>

        <HStack>
          {players.map((player: any) => (
            <Card
              key={player.id}
              background="#FAFAFC"
              border="1px solid #E2E8F0"
            >
              <CardBody>
                <Image
                  alt={player.name}
                  borderRadius="lg"
                  src={player.playerPhoto}
                  bg="white"
                  border="1px solid #E2E8F0"
                />
                <Stack>
                  <Text fontWeight="bold">{player.name}</Text>
                  <Text>Recovery Percentage</Text>

                  <Tooltip
                    label={Math.random() * 100 + "%"}
                    aria-label="Recovery Percentage"
                    bg="black"
                  >
                    <Progress
                      borderRadius={"md"}
                      colorScheme="black"
                      size="sm"
                      value={Math.random() * 100}
                    />
                  </Tooltip>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </HStack>
      </Box>
    )
  );
};
