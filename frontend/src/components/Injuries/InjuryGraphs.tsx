import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export const InjuryGraphs = () => {
  return (
    <Tabs align="center" colorScheme="black" variant="soft-rounded" mt="5">
      <TabList>
        <Tab>Range of Motion</Tab>
        <Tab>Pain Level</Tab>
        <Tab>Endurance</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Range of Motion</p>
        </TabPanel>
        <TabPanel>
          <p>Pain Level</p>
        </TabPanel>
        <TabPanel>
          <p>Endurance</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
