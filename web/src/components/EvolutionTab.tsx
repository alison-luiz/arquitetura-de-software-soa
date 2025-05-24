import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../config/api";
import { EvolutionResponse } from "../types/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export default function EvolutionTab() {
  const [name, setName] = useState("");
  const [firstYear, setFirstYear] = useState("");
  const [lastYear, setLastYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EvolutionResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateYears = (start: string, end: string): boolean => {
    const startNum = parseInt(start);
    const endNum = parseInt(end);

    if (endNum < startNum) {
      setError("O ano final não pode ser menor que o ano inicial");
      return false;
    }

    setError(null);
    return true;
  };

  const handleFirstYearChange = (event: SelectChangeEvent) => {
    setFirstYear(event.target.value);
    setError(null);
  };

  const handleLastYearChange = (event: SelectChangeEvent) => {
    setLastYear(event.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateYears(firstYear, lastYear)) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get<EvolutionResponse[]>("/evolution", {
        params: {
          name,
          firstYear,
          lastYear,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setError("Erro ao buscar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: data[0]?.periods.map((p) => p.year) || [],
    datasets: data.map((item) => ({
      label: item.name,
      data: item.periods.map((p) => p.frequency),
      borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`,
      tension: 0.1,
    })),
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
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Ano Inicial</InputLabel>
            <Select
              value={firstYear}
              label="Ano Inicial"
              onChange={handleFirstYearChange}
            >
              {DECADES.map((decade) => (
                <MenuItem key={decade.value} value={decade.value}>
                  {decade.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Ano Final</InputLabel>
            <Select
              value={lastYear}
              label="Ano Final"
              onChange={handleLastYearChange}
            >
              {DECADES.map((decade) => (
                <MenuItem key={decade.value} value={decade.value}>
                  {decade.label}
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {data.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Evolução do Nome
          </Typography>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: "Evolução da Frequência do Nome",
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
                    text: "Ano",
                  },
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
