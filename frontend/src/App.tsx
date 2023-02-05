import { ChakraProvider } from "@chakra-ui/react";
import { NewInjuryButton } from "./components/NewInjury/NewInjuryButton";
import theme from "./assets/theme";
import { TeamInjurySummary } from "./components/Injuries/TeamInjurySummary";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <NewInjuryButton />

        <TeamInjurySummary />
      </div>
    </ChakraProvider>
  );
}

export default App;
