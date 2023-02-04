import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NewInjuryButton } from "./components/NewInjury/NewInjuryButton";
import theme from "./assets/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <NewInjuryButton />
      </div>
    </ChakraProvider>
  );
}

export default App;
