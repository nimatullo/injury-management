import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import ApiService from "../../services/ApiService";
import {
  ApiResponse,
  Injury,
  Player,
  PlayerInjuries,
  Treatment,
} from "../../services/types";
import AutoSuggestionField from "../Form/AutoSuggestionField";
import { DateInput } from "../Form/DateInput";

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cb: () => void;
}

interface NewAppointmentButtonProps {
  cb: () => void;
}

export const NewAppointmentButton = ({ cb }: NewAppointmentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box display="flex" alignItems="center" py="1em">
        <Button
          w="100%"
          maxWidth="350px"
          size="sm"
          leftIcon={<BsFillCalendarPlusFill />}
          colorScheme="black"
          onClick={onOpen}
        >
          Schedule New Appointment
        </Button>
      </Box>

      <NewAppointmentModal isOpen={isOpen} onClose={onClose} cb={cb} />
    </>
  );
};

const NewAppointmentModal = ({
  isOpen,
  onClose,
  cb,
}: NewAppointmentModalProps) => {
  const [injuredPlayers, setInjuredPlayers] = React.useState<PlayerInjuries[]>(
    []
  );
  const [selectedPlayer, setSelectedPlayer] = React.useState<string>("");
  const [treatments, setTreatments] = React.useState<string[]>([]);

  const [injuries, setInjuries] = React.useState<Injury[]>([]);

  const [selectedInjury, setSelectedInjury] = React.useState("");
  const [selectedTreatment, setSelectedTreatment] = React.useState("");
  const [appointmentDateTime, setAppointmentDateTime] = React.useState(
    new Date()
  );

  React.useEffect(() => {
    const endpoint = "injuries/players";
    ApiService.get(endpoint).then((res) => {
      setInjuredPlayers(res.data);
    });
  }, []);

  const handlePlayerChange = (e: any) => {
    const playerId = e.target.value;

    const player = injuredPlayers.find(
      (player: PlayerInjuries) => player.id === playerId
    );

    if (player) {
      setInjuries(player.injuries);
    }

    setSelectedPlayer(playerId);
  };

  const handleInjuryChange = (e: any) => {
    const injuryName = e.target.value;
    setSelectedInjury(injuryName);
    const endpoint = `injuries/${injuryName}/treatments`;

    ApiService.get(endpoint).then((res: ApiResponse<Treatment[]>) => {
      setTreatments(
        res.data.map((treatment: Treatment) => treatment.treatmentName)
      );
    });
  };

  const handleSubmit = () => {
    const endpoint = `appointments/player/${selectedPlayer}`;
    const data = {
      injuryName: selectedInjury,
      treatment: selectedTreatment,
      dateTime: appointmentDateTime.toISOString(),
    };

    ApiService.post(endpoint, data).then((res) => {
      if (res.status === 200) {
        onClose();
        cb();
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">New Appointment</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl my="2">
            <FormLabel>Player</FormLabel>
            <Select
              placeholder="Select injured player"
              onChange={handlePlayerChange}
            >
              {injuredPlayers &&
                injuredPlayers.map((player: any) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl my="2">
            <FormLabel>Injury</FormLabel>
            <Select
              disabled={injuries.length === 0}
              placeholder="Select injury"
              onChange={handleInjuryChange}
            >
              {injuries &&
                injuries.map((injury: any) => (
                  <option key={injury.id} value={injury.injuryName}>
                    {injury.injuryName}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl my="2" zIndex={50}>
            <FormLabel>Appointment Date & Time</FormLabel>
            <DateInput
              onChange={(date) => setAppointmentDateTime(date)}
              value={appointmentDateTime}
              showTimeSelect
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Treatment</FormLabel>
            <AutoSuggestionField
              disabled={!selectedInjury}
              placeholder="Start typing to see suggestions"
              onSelect={(t) => setSelectedTreatment(t)}
              options={treatments}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="black" mr={3} onClick={handleSubmit}>
            Create Appointment
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
