import React from "react";
import { Box, IconButton, Stack, Tooltip } from "@chakra-ui/react";

import { HiHome } from "react-icons/hi";
import { BsFillCalendar3WeekFill } from "react-icons/bs";
import { MdPersonalInjury } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";
import { InjuredPlayerPopover } from "../Injuries/InjuredPlayerPopover";
import { Player, PlayerInjuries } from "../../services/types";
import ApiService from "../../services/ApiService";

const Sidebar: React.FC = () => {
  const [injuredPlayers, setInjuredPlayers] = React.useState<PlayerInjuries[]>(
    []
  );

  React.useEffect(() => {
    ApiService.getInjuredPlayers().then((players) => {
      setInjuredPlayers(players);
    });
  }, []);

  const location = useLocation();
  const home = location.pathname === "/";
  const appointments = location.pathname === "/appointments";
  const injuries = location.pathname.includes("/injury-report");
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.id) {
      case "home":
        navigate("/");
        break;
      case "appointments":
        navigate("/appointments");
        break;
    }
  };

  return (
    <Box
      bg="#FAFAFC"
      width="100px"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="1em"
      borderTopRightRadius="lg"
      borderBottomRightRadius="lg"
      border="1px solid #E2E8F0"
    >
      <Stack spacing={8}>
        <Tooltip label="Home" aria-label="Home" placement="right" bg="black">
          <IconButton
            id="home"
            icon={<HiHome />}
            variant="outline"
            aria-label="Home"
            borderRadius="full"
            size="lg"
            border="none"
            bg="#EFEFF0"
            isActive={home}
            color="black"
            _active={{
              bg: "black",
              color: "white",
            }}
            onClick={handleClick}
          />
        </Tooltip>
        <Tooltip
          label="Appointments"
          aria-label="Appointments"
          placement="right"
          bg="black"
        >
          <IconButton
            id="appointments"
            icon={<BsFillCalendar3WeekFill />}
            variant="outline"
            aria-label="Appointments"
            borderRadius="full"
            border="none"
            size="lg"
            bg="#EFEFF0"
            isActive={appointments}
            color="black"
            _active={{
              bg: "black",
              color: "white",
            }}
            onClick={handleClick}
          />
        </Tooltip>
        <InjuredPlayerPopover players={injuredPlayers} />
      </Stack>
    </Box>
  );
};

export default Sidebar;
