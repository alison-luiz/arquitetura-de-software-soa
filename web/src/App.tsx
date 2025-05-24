import { useState } from "react";
import { Container, Box, Tab, Tabs, Typography, Paper } from "@mui/material";
import EvolutionTab from "./components/EvolutionTab";
import RankingTab from "./components/RankingTab";
import ComparisonTab from "./components/ComparisonTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Consulta de Nomes IBGE
        </Typography>
        <Paper sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Evolução" />
              <Tab label="Ranking" />
              <Tab label="Comparação" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <EvolutionTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RankingTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ComparisonTab />
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
