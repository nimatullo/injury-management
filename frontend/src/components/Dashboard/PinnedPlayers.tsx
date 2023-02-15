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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  CircularProgress,
  Center,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ApiService from "../../services/ApiService";
import { ApiResponse, RecoveryTracking } from "../../services/types";

export const PinnedPlayers = () => {
  const [players, setPlayers] = React.useState<RecoveryTracking[]>([]);
  const [isTimeout, setIsTimeout] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetchRecoveryPlayers();
  }, []);

  const fetchRecoveryPlayers = async () => {
    ApiService.getPinnedPlayers().then((response: ApiResponse<any>) => {
      switch (response.status) {
        case 200:
          setPlayers(response.data);
          setLoading(false);
          return;
        case 408:
          setIsTimeout(true);
          setLoading(false);
          return;
      }
    });
  };

  const getStatArrow = (after: number, before: number) => {
    if (before > after) {
      return (
        <>
          <StatArrow type="decrease" color="red.500" />
          {Math.abs(after - before).toFixed(1)}
        </>
      );
    } else if (before < after) {
      return (
        <>
          <StatArrow type="increase" color="green.500" />
          {Math.abs(before - after).toFixed(1)}
        </>
      );
    }
  };

  return (
    <>
      {loading && (
        <Center>
          <CircularProgress isIndeterminate color="black" />
        </Center>
      )}
      {isTimeout && (
        <Center>
          <Text color="gray.700">
            Request timed out. Most likely NBA API is down.
          </Text>
        </Center>
      )}
      {players.length > 0 && (
        <Box>
          <HStack alignItems="baseline">
            <Heading size="md" mb="5">
              Recovery Tracking
            </Heading>
            <Tooltip
              label="This evaluates the player's performance prior to the injury and determines their progress towards returning to that level of play. For demo purposes, the stat that is being tracked is the player's fantasy points per game."
              aria-label="This evaluates the player's performance prior to the injury and determines their progress towards returning to that level of play."
              bg="black"
            >
              <span>
                <Icon as={BsFillInfoCircleFill} color="black" boxSize="3" />
              </span>
            </Tooltip>
          </HStack>

          <HStack justifyContent="space-around">
            {players.map((tracking: RecoveryTracking) => (
              <Card
                key={tracking.player.name}
                background="#FAFAFC"
                border="1px solid #E2E8F0"
              >
                <CardBody>
                  <Image
                    alt={tracking.player.name}
                    borderRadius="lg"
                    src={tracking.player.photo}
                    bg="white"
                    border="1px solid #E2E8F0"
                    objectFit="cover"
                  />
                  <Stack>
                    <Text fontWeight="bold">{tracking.player.name}</Text>
                    <HStack alignItems="flex-start">
                      <Stat>
                        <StatLabel>Before Injury</StatLabel>
                        <StatNumber>
                          {tracking.beforeAvg?.toFixed(2)}
                        </StatNumber>
                      </Stat>

                      <Stat>
                        <StatLabel>After Recovery</StatLabel>
                        <StatNumber>{tracking.afterAvg?.toFixed(2)}</StatNumber>
                        <StatHelpText>
                          {getStatArrow(tracking.afterAvg, tracking.beforeAvg)}
                        </StatHelpText>
                      </Stat>
                    </HStack>
                    <Text>Recovery Percentage</Text>

                    <Tooltip
                      label={tracking.recoveryPercentage + "%"}
                      aria-label="Recovery Percentage"
                      bg="black"
                    >
                      <Progress
                        borderRadius={"md"}
                        colorScheme="black"
                        size="sm"
                        value={tracking.recoveryPercentage}
                      />
                    </Tooltip>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </HStack>
        </Box>
      )}
    </>
  );
};
