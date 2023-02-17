import { Text, useDisclosure } from "@chakra-ui/react";
import {
  ProgramItem,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
} from "planby";
import { AppointmentEditModal } from "./AppointmentEditModal";

interface ProgramItemWithCallback extends ProgramItem {
  cb: () => void;
}

export const AppointmentTimelineItem = ({
  program,
  cb,
  ...rest
}: ProgramItemWithCallback) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive, isMinWidth } =
    useProgram({
      program,
      ...rest,
    });

  const { data } = program;
  const { image, title, since, till } = data;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent width={styles.width} isLive={isLive}>
        <ProgramFlex
          onClick={() => {
            onOpen();
          }}
        >
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
            <Text fontSize="sm" color="gray.300">
              {data?.notes}
            </Text>

            <AppointmentEditModal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                cb();
              }}
              appointmentId={data.id}
            />
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  );
};
