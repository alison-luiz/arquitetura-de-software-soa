import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../config/api";
import { RankingResponse } from "../types/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DECADES = [
  { value: "1930", label: "1930" },
  { value: "1940", label: "1940" },
  { value: "1950", label: "1950" },
  { value: "1960", label: "1960" },
  { value: "1970", label: "1970" },
  { value: "1980", label: "1980" },
  { value: "1990", label: "1990" },
  { value: "2000", label: "2000" },
  { value: "2010", label: "2010" },
];

const STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
  { value: "BR", label: "Brasil" },
];

export default function RankingTab() {
  const [decade, setDecade] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RankingResponse[]>([]);

  const handleDecadeChange = (event: SelectChangeEvent) => {
    setDecade(event.target.value);
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.get<RankingResponse[]>("/ranking", {
        params: {
          decade,
          state,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: data[0]?.items.slice(0, 10).map((item) => item.name) || [],
    datasets: [
      {
        label: "Frequência",
        data: data[0]?.items.slice(0, 10).map((item) => item.frequency) || [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 3,
          }}
        >
          <FormControl fullWidth required>
            <InputLabel>Década</InputLabel>
            <Select value={decade} label="Década" onChange={handleDecadeChange}>
              {DECADES.map((decade) => (
                <MenuItem key={decade.value} value={decade.value}>
                  {decade.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Estado</InputLabel>
            <Select value={state} label="Estado" onChange={handleStateChange}>
              {STATES.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ minWidth: "120px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Buscar"}
          </Button>
        </Box>
      </form>

      {data.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Top 10 Nomes - {data[0].locality}
          </Typography>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: "Top 10 Nomes Mais Frequentes",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Frequência",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Nome",
                  },
                },
              },
            }}
          />
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Posição</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Frequência</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data[0].items.map((item) => (
                  <TableRow key={item.ranking}>
                    <TableCell>{item.ranking}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">
                      {item.frequency.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
