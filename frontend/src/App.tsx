import { ChakraProvider } from "@chakra-ui/react";
import theme from "./assets/theme";
import "./assets/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { InjuryReport } from "./pages/InjuryReport";
import { Appointments } from "./pages/Appointments";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path=":id/injury-report" element={<InjuryReport />} />
          <Route path=":id/appointments" element={<Appointments />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
