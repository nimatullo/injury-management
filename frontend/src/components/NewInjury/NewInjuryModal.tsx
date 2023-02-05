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
import ApiService, { ListItems } from "../../services/ApiService";

interface NewInjuryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InjuryReport {
  playerId: string;
  injuryName: string;
  injuryDate?: string;
}

export const NewInjuryModal = ({ isOpen, onClose }: NewInjuryModalProps) => {
  const [players, setPlayers] = React.useState<ListItems[]>([]);
  const [injuries, setInjuries] = React.useState<string[]>([]);

  const [selectedPlayerId, setPlayer] = React.useState<string>("");
  const [injury, setInjury] = React.useState<string>("");
  const [injuryDate, setInjuryDate] = React.useState<string>("");

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
      data.injuryDate = injuryDate;
    }

    ApiService.submitInjuryReport(data).then((response) => {
      if (response.status === 200) {
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
              options={players}
              onSelect={(value) => setPlayer(value)}
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Injury</FormLabel>
            <AutoSuggestionField
              options={injuries}
              onSelect={(value) => setInjury(value)}
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Injury date</FormLabel>
            <Input
              placeholder="Select injury date"
              type="date"
              onChange={(e) => setInjuryDate(e.target.value)}
            />
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
