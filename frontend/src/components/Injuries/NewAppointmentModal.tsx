import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
import AutoSuggestionField from "../Form/AutoSuggestionField";

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: any;
  injuries: any;
}

interface NewAppointmentButtonProps {
  player: any;
  injuries: any;
}

export const NewAppointmentButton = ({
  player,
  injuries,
}: NewAppointmentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        mt="2"
        size="sm"
        leftIcon={<BsFillCalendarPlusFill />}
        colorScheme="black"
        onClick={onOpen}
      >
        Schedule
      </Button>

      <NewAppointmentModal
        isOpen={isOpen}
        onClose={onClose}
        player={player}
        injuries={injuries}
      />
    </>
  );
};

const NewAppointmentModal = ({
  isOpen,
  onClose,
  player,
  injuries,
}: NewAppointmentModalProps) => {
  const [treatments, setTreatments] = React.useState([]);

  const handleInjuryChange = (e: any) => {
    const injuryName = e.target.value;
    const endpoint = `injuries/${injuryName}/treatments`;

    ApiService.get(endpoint).then((res) => {
      setTreatments(res.data.map((treatment: any) => treatment.treatmentName));
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">New Appointment for {player.name}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl my="2">
            <Select placeholder="Select injury" onChange={handleInjuryChange}>
              {injuries &&
                injuries.map((injury: any) => (
                  <option key={injury.id} value={injury.injuryName}>
                    {injury.injuryName}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl my="2">
            <FormLabel>Appointment Date</FormLabel>
            <Input placeholder="Enter appointment date" type="date" />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Appointment Time</FormLabel>
            <Input placeholder="Appointment time" type="time" />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Treatment</FormLabel>
            <AutoSuggestionField
              placeholder="Select treatment"
              onSelect={() => {}}
              options={treatments}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="black"
            mr={3}
            onClick={() => console.log("hello")}
          >
            Create Appointment
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
