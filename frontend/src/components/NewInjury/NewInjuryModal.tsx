import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";
import AutoSuggestionField from "../Form/AutoSuggestionField";
import ApiService from "../../services/ApiService";
import { ListItems } from "../../services/types";
import { DateInput } from "../Form/DateInput";

interface NewInjuryModalProps {
  isOpen: boolean;
  onClose: () => void;
  callback: () => void;
}

interface InjuryReport {
  playerId: string;
  injuryName: string;
  injuryDate?: string;
}

export const NewInjuryModal = ({
  isOpen,
  onClose,
  callback,
}: NewInjuryModalProps) => {
  const [players, setPlayers] = React.useState<ListItems[]>([]);
  const [injuries, setInjuries] = React.useState<string[]>([]);

  const [selectedPlayerId, setPlayer] = React.useState<string>("");
  const [injury, setInjury] = React.useState<string>("");
  const [injuryDate, setInjuryDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    ApiService.getPlayers().then((response) => {
      setPlayers(response);
    });

    ApiService.getInjuries().then((response) => {
      setInjuries(response);
    });
  }, []);

  const handleSubmit = () => {
    const data: InjuryReport = {
      playerId: selectedPlayerId,
      injuryName: injury,
    };

    if (injuryDate) {
      data.injuryDate = injuryDate.toISOString();
    }

    const endpoint = `injuries/${selectedPlayerId}`;
    ApiService.post(endpoint, data).then((response) => {
      if (response.status === 200) {
        callback();
        onClose();
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report New Injury</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl my="2">
            <FormLabel>Player name</FormLabel>
            <AutoSuggestionField
              placeholder="Start typing player name..."
              options={players}
              onSelect={(value) => setPlayer(value)}
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Injury</FormLabel>
            <AutoSuggestionField
              disabled={selectedPlayerId === ""}
              options={injuries}
              placeholder="Enter injury name"
              onSelect={(value) => setInjury(value)}
            />
          </FormControl>

          <FormControl my="2" zIndex={50}>
            <FormLabel>Injury date</FormLabel>
            <DateInput
              onChange={(date) => setInjuryDate(date)}
              value={injuryDate}
            />
            {/* <Input
              placeholder="Select injury date"
              type="date"
              onChange={(e) => setInjuryDate(e.target.value)}
            /> */}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"black"} mr={3} onClick={handleSubmit}>
            Create injury report
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
