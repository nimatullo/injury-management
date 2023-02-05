import { Button, useDisclosure } from "@chakra-ui/react";
import { NewInjuryModal } from "./NewInjuryModal";

export const NewInjuryButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="black" onClick={onOpen} borderColor="transparent">
        Create Injury Report
      </Button>

      <NewInjuryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
