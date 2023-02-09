import {
  Heading,
  HStack,
  Text,
  Icon,
  useDisclosure,
  Table,
  Tbody,
  Tr,
  Td,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AppointmentEditModal } from "./AppointmentEditModal";

export const AppointmentsList = ({ appointments, isExtended }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedAppointment, setSelectedAppointment] =
    React.useState<any>(null);

  React.useEffect(() => {
    console.log("isExtended", isExtended);
  }, [isExtended]);

  const convert24to12 = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hours12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 || parseInt(hours) === 24 ? "AM" : "PM";
    return `${hours12}:${minutes} ${ampm}`;
  };

  const handleAppointmentClick = (appointment: any) => {
    onOpen();
    setSelectedAppointment(appointment);
  };

  const formatDate = (appointmentDate: string) => {
    return moment(appointmentDate, "YYYY-MM-DD").format("MM/DD/YY");
  };

  return appointments.appointments?.length > 0 ? (
    <Table variant="simple" size="sm" borderColor="transparent">
      <Tbody>
        {appointments?.appointments.map((appointment: any) => {
          return (
            <>
              <Tr>
                <Td border="0px" py="1" paddingStart="0">
                  <Heading
                    size="sm"
                    _hover={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    {appointment.forTreatment.treatmentName}
                  </Heading>
                </Td>
                <Td isNumeric py="1" border="0px" paddingStart="0">
                  {formatDate(appointment.date)}
                </Td>
                <Td isNumeric py="1" border="0px" paddingStart="0">
                  <HStack justifyContent="flex-end">
                    <Text>{convert24to12(appointment.time)}</Text>
                    <Tooltip
                      label="Confirmed"
                      aria-label="Confirmed"
                      bg="green.500"
                    >
                      <span>
                        <Icon as={BsCheckCircleFill} color="green.500" />
                      </span>
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
              <AppointmentEditModal
                appointment={selectedAppointment}
                isOpen={isOpen}
                onClose={onClose}
              />
            </>
          );
        })}
      </Tbody>
      {appointments.total > 3 && !isExtended && (
        <Text>+ {appointments.total - 3} more</Text>
      )}
    </Table>
  ) : (
    <Text>No upcoming appointments</Text>
  );
};

// return appointments.appointments?.length > 0 ? (
//   <>
//     {appointments?.appointments.map((appointment: any) => {
//       return (
//         <>
//           {/* <Flex
//             justifyContent="space-between"
//             alignItems="center"
//             key={appointment.id}
//           >
//             <Heading
//               size="sm"
//               _hover={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//               onClick={() => handleAppointmentClick(appointment)}
//             >
//               {appointment.forTreatment.treatmentName}
//             </Heading>
//             <Text>{formatDate(appointment.date)}</Text>
//             <HStack>
//               <Text>{convert24to12(appointment.time)}</Text>
//               <Icon as={BsCheckCircleFill} color="green.500" />
//             </HStack>
//           </Flex>
//           <AppointmentEditModal
//             appointment={selectedAppointment}
//             isOpen={isOpen}
//             onClose={onClose}
//           /> */}
//         </>
//       );
//     })}
//     {appointments.total > 3 && <Text>+ {appointments.total - 3} more</Text>}
//   </>
// ) : (
//   <Text>No upcoming appointments</Text>
// );
