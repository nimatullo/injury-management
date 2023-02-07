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
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import ApiService from "../../services/ApiService";

export const AppointmentEditModal = ({
  isOpen,
  onClose,
  appointment,
  cb,
}: any) => {
  const [notes, setNotes] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    if (appointment) {
      setNotes(appointment.notes);
      setDate(new Date(appointment.date).toISOString().substring(0, 10));
      setTime(appointment.time);
    }
  }, [appointment]);

  const handleUpdate = () => {
    const endpoint = `players/appointments/${appointment.id}`;
    const data = {
      notes,
      date,
      time,
    };

    ApiService.put(endpoint, data).then((res) => {
      if (res.status === 200) {
        onClose();
        cb();
      }
    });
  };

  return (
    appointment && (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">
              {appointment.forTreatment.treatmentName} Appointment
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my="2">
              <FormLabel>Appointment Date</FormLabel>
              <Input
                placeholder="Enter appointment date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>

            <FormControl my="2">
              <FormLabel>Appointment Time</FormLabel>
              <Input
                placeholder="Appointment time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
