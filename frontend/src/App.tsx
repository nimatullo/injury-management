import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <h1>Hello</h1>
      </div>
    </ChakraProvider>
  );
}

export default App;
