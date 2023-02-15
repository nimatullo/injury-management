import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineShortcut, MdPersonalInjury } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayerInjuries } from "../../services/types";

interface InjuredPlayerPopoverProps {
  players: PlayerInjuries[];
}

export const InjuredPlayerPopover = ({
  players,
}: InjuredPlayerPopoverProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Menu placement="right" closeOnBlur={true} closeOnSelect={true}>
      <Tooltip
        label="Go to Player"
        aria-label="Go to Player"
        placement="right"
        bg="black"
      >
        <MenuButton
          as={IconButton}
          icon={<MdOutlineShortcut />}
          variant="outline"
          aria-label="Injuries"
          borderRadius="full"
          size="lg"
          border="none"
          color="black"
          bg="#EFEFF0"
          isActive={location.pathname.includes("/injury-report")}
          _active={{
            bg: "black",
            color: "white",
          }}
        >
          Injuries
        </MenuButton>
      </Tooltip>
      <Portal>
        <MenuList shadow="md">
          {players.length > 0 ? (
            players.map((player) => {
              return (
                <MenuItem
                  _hover={{
                    bg: "#1d1d1d",
                    color: "white",
                  }}
                  onClick={() => {
                    navigate(`/injury-report/${player.id}`);
                  }}
                  key={location.pathname + player.id}
                >
                  <HStack justifyContent="space-between">
                    <Text fontWeight="bold">{player.name}</Text>
                    <Text fontSize="sm">{player.injuries[0].injuryName}</Text>
                  </HStack>
                </MenuItem>
              );
            })
          ) : (
            <p>hello</p>
          )}
        </MenuList>
      </Portal>
    </Menu>
  );
};
