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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import ApiService from "../../services/ApiService";
import { DateInput } from "../Form/DateInput";

interface NewMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  exercise: string;
  id: string;
  callback?: () => void;
  lastExerciseDate?: Date;
}

interface NewMeasurementButtonProps {
  category: string;
  exercise: string;
  id: string;
  callback?: () => void;
  lastExerciseDate?: Date;
}

export const NewMeasurementButton = ({
  category,
  exercise,
  id,
  callback,
  lastExerciseDate,
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
        lastExerciseDate={lastExerciseDate}
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
  lastExerciseDate,
}: NewMeasurementModalProps) => {
  const [measurement, setMeasurement] = React.useState<number>(0);
  const [measurementDate, setMeasurementDate] = React.useState<Date>(
    new Date()
  );

  const handleSubmit = () => {
    const endpoint = `players/${id}/measurements/${category}`;
    const data = {
      measurement: measurement.toString(),
      date: measurementDate.toISOString(),
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
            <NumberInput
              value={measurement}
              onChange={(value) => setMeasurement(parseInt(value))}
              max={100}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl my="2">
            <FormLabel>Level of pain</FormLabel>
            <Slider defaultValue={0} max={10}>
              <SliderTrack>
                <SliderFilledTrack bg="black" />
              </SliderTrack>
              <SliderThumb boxSize={5} />
            </Slider>
          </FormControl>

          <FormControl my="2" zIndex={50}>
            <FormLabel>Measurement Date</FormLabel>
            <DateInput
              beginDate={lastExerciseDate}
              onChange={(date) => setMeasurementDate(date)}
              value={measurementDate}
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
