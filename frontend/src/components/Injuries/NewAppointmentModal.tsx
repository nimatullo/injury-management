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
  cb: () => void;
}

interface NewAppointmentButtonProps {
  player: any;
  injuries: any;
  cb: () => void;
}

export const NewAppointmentButton = ({
  player,
  injuries,
  cb,
}: NewAppointmentButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        mt="2"
        size="sm"
        leftIcon={<BsFillCalendarPlusFill />}
        backgroundColor="whiteAlpha.900"
        color="black"
        onClick={onOpen}
      >
        Schedule
      </Button>

      <NewAppointmentModal
        isOpen={isOpen}
        onClose={onClose}
        player={player}
        injuries={injuries}
        cb={cb}
      />
    </>
  );
};

const NewAppointmentModal = ({
  isOpen,
  onClose,
  player,
  injuries,
  cb,
}: NewAppointmentModalProps) => {
  const [treatments, setTreatments] = React.useState([]);

  const [selectedInjury, setSelectedInjury] = React.useState("");
  const [selectedTreatment, setSelectedTreatment] = React.useState("");
  const [appointmentDate, setAppointmentDate] = React.useState("");
  const [appointmentTime, setAppointmentTime] = React.useState("");

  const handleInjuryChange = (e: any) => {
    const injuryName = e.target.value;
    setSelectedInjury(injuryName);
    const endpoint = `injuries/${injuryName}/treatments`;

    ApiService.get(endpoint).then((res) => {
      setTreatments(res.data.map((treatment: any) => treatment.treatmentName));
    });
  };

  const handleSubmit = () => {
    const endpoint = `players/${player.id}/appointments`;
    const data = {
      injuryName: selectedInjury,
      treatment: selectedTreatment,
      date: appointmentDate,
      time: appointmentTime,
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
            <Input
              placeholder="Enter appointment date"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Appointment Time</FormLabel>
            <Input
              placeholder="Appointment time"
              type="time"
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Treatment</FormLabel>
            <AutoSuggestionField
              placeholder="Select treatment"
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
