import React, { useState } from "react";
import { Box, Input, List, ListItem } from "@chakra-ui/react";
import { ListItems } from "../../services/ApiService";

interface AutocompleteProps {
  options: ListItems[] | string[];
  onSelect: (value: string) => void;
}

const AutoSuggestionField: React.FC<AutocompleteProps> = ({
  options,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
    onSelect(e.target.value);
  };

  const handleSelect = (value: ListItems | string) => {
    if (typeof value === "string") {
      setInputValue(value);
      onSelect(value);
    } else {
      setInputValue(value.name);
      onSelect(value.id);
    }
    setShowSuggestions(false);
  };

  const getFilteredOptions = () => {
    // Handle case where options is an array of strings
    if (typeof options[0] === "string") {
      return (options as string[])
        .filter((option: string) =>
          option.toLowerCase().startsWith(inputValue.toLowerCase())
        )
        .map((option: string) => (
          <ListItem
            _hover={{
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              borderRadius: "5",
            }}
            p="2"
            key={option}
            onClick={() => handleSelect(option)}
          >
            {option}
          </ListItem>
        ));
    } else {
      return (options as ListItems[])
        .filter((option: ListItems) =>
          option.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
        .map((option: ListItems) => (
          <ListItem
            _hover={{
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              borderRadius: "5",
            }}
            p="2"
            key={option.id}
            onClick={() => handleSelect(option)}
          >
            {option.name}
          </ListItem>
        ));
    }
  };

  return (
    <Box>
      <Input value={inputValue} onChange={handleInputChange} />
      {showSuggestions && (
        <List
          p="0.5"
          backgroundColor={"gray.100"}
          mt={"1"}
          borderRadius="5"
          overflow={"hidden"}
        >
          {getFilteredOptions()}
        </List>
      )}
    </Box>
  );
};

export default AutoSuggestionField;
