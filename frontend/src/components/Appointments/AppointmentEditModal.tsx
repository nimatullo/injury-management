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
  Text,
  Textarea,
} from "@chakra-ui/react";
import moment from "moment";
import React, { ChangeEventHandler } from "react";
import ApiService from "../../services/ApiService";
import { ApiResponse, Appointments } from "../../services/types";

export const AppointmentEditModal = ({
  isOpen,
  onClose,
  appointmentId,
  cb,
}: any) => {
  const [notes, setNotes] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [appointment, setAppointment] = React.useState<string>("");
  const [player, setPlayer] = React.useState<any>("");

  React.useEffect(() => {
    if (isOpen) {
      const endpoint = `appointments/${appointmentId}`;
      ApiService.get(endpoint).then((res: ApiResponse<Appointments>) => {
        if (res.status === 200) {
          setDate(moment(res.data.dateTime).format("YYYY-MM-DDTHH:mm"));
          setNotes(res.data.notes);
          setAppointment(res.data.forTreatment.treatmentName);
          setPlayer(res.data.player.name);
        }
      });
    }
  }, [isOpen]);

  const handleUpdate = () => {
    const endpoint = `appointments/${appointmentId}`;
    const data = {
      dateTime: date,
      notes,
    };

    ApiService.put(endpoint, data).then((res) => {
      if (res.status === 200) {
        onClose();
        cb();
      }
    });
  };

  const handleDateTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDate(e.target.value);
  };

  return (
    appointmentId && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">{appointment} Appointment</Heading>
            <Text color="gray.500" fontSize="sm">
              {player}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my="2">
              <FormLabel>Appointment Date</FormLabel>
              <Input
                placeholder="Enter appointment date"
                type="datetime-local"
                value={date}
                onChange={handleDateTimeChange}
                onInput={handleDateTimeChange}
              />
            </FormControl>

            <FormControl my="2">
              <FormLabel>Notes</FormLabel>
              <Textarea
                placeholder="Enter notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="black" mr={3} onClick={handleUpdate}>
              Update Appointment
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );
};
