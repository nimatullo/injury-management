import { ChakraProvider } from "@chakra-ui/react";
import theme from "./assets/theme";
import "./assets/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { InjuryReport } from "./components/Injuries/InjuryReport";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/injury-report/:id" element={<InjuryReport />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
