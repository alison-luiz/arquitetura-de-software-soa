import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
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
import { ComparisonResponse } from "../types/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonTab() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ComparisonResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.get<ComparisonResponse>("/comparison", {
        params: {
          name1,
          name2,
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
    labels: data?.items[0]?.periods.map((p) => p.year) || [],
    datasets:
      data?.items.map((item) => ({
        label: item.name,
        data: item.periods.map((p) => p.frequency),
        borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        tension: 0.1,
      })) || [],
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Primeiro Nome"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            required
          />
          <TextField
            label="Segundo Nome"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Comparar"}
          </Button>
        </Box>
      </form>

      {data && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Comparação de Nomes
          </Typography>
          <Line data={chartData} />
        </Box>
      )}
    </Box>
  );
}
