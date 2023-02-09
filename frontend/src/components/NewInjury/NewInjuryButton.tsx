import { Button, useDisclosure, IconButton } from "@chakra-ui/react";
import { NewInjuryModal } from "./NewInjuryModal";
import { MdPersonalInjury } from "react-icons/md";

export const NewInjuryButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<MdPersonalInjury />}
        colorScheme="black"
        onClick={onOpen}
        borderColor="transparent"
        size="sm"
      >
        Report Injury
      </Button>

      <NewInjuryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
