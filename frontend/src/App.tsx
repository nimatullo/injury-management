import { ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import theme from "./assets/theme";
import "./assets/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { InjuryReport } from "./pages/InjuryReport";
import { Appointments } from "./pages/Appointments";
import { AllAppointments } from "./pages/AllAppointments";
import Sidebar from "./components/Dashboard/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Flex>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path=":id/injury-report" element={<InjuryReport />} />
            <Route path=":id/appointments" element={<Appointments />} />
            <Route path="/appointments" element={<AllAppointments />} />
          </Routes>
        </Flex>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
