import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import ApiService from "../../services/ApiService";

interface NewMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  exercise: string;
  id: string;
  callback?: () => void;
}

interface NewMeasurementButtonProps {
  category: string;
  exercise: string;
  id: string;
  callback?: () => void;
}

export const NewMeasurementButton = ({
  category,
  exercise,
  id,
  callback,
}: NewMeasurementButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        ml="5"
        aria-label="Add New Measurement"
        colorScheme="black"
        fontSize="20px"
        size="lg"
        borderRadius="50%"
        onClick={onOpen}
        icon={<AiFillPlusCircle />}
      />

      <NewMeasurementModal
        category={category}
        exercise={exercise}
        isOpen={isOpen}
        onClose={onClose}
        callback={callback}
        id={id}
      />
    </>
  );
};

const NewMeasurementModal = ({
  isOpen,
  onClose,
  category,
  exercise,
  id,
  callback,
}: NewMeasurementModalProps) => {
  const [measurement, setMeasurement] = React.useState<string>("0");
  const [measurementDate, setMeasurementDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = () => {
    const endpoint = `players/${id}/measurements/${category}`;
    const data = {
      measurement,
      date: measurementDate,
      exercise,
    };
    ApiService.post(endpoint, data).then((response) => {
      if (response.status === 200) {
        onClose();
        if (callback) {
          callback();
        }
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">New Measurement for {category}</Heading>
          <Text color="gray.500" fontSize="sm">
            {exercise}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl my="2">
            <FormLabel>Measurement</FormLabel>
            <Input
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
              placeholder="Enter new measurement"
              type="number"
            />
          </FormControl>

          <FormControl my="2">
            <FormLabel>Measurement Date</FormLabel>
            <Input
              value={measurementDate}
              onChange={(e) => setMeasurementDate(e.target.value)}
              placeholder="Measurement date"
              type="date"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="black" mr={3} onClick={handleSubmit}>
            Submit Measurement
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
