// src/Components/TemperatureChart.tsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ref, onValue, query, limitToLast } from "firebase/database";
import { database } from "../configBD/firebaseConfig"; 
//import { color } from 'chart.js/helpers';

// Registro de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define la estructura de los datos del gráfico
interface ChartDataType {
  labels: string[]; 
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
  }[];
}

const Grafico: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🛑 RUTA CORREGIDA: Apunta a 'lecturas/historial' y limita a las últimas 20 entradas
    const historicoQuery = query(ref(database, 'lecturas/historial'), limitToLast(20));

    const unsubscribe = onValue(historicoQuery, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        const labels: string[] = [];
        const temperatures: number[] = [];

        console.log(temperatures);

        // 1. Convertir el objeto de Firebase a un array y ordenar por timestamp
        const sortedData = Object.keys(data)
          .map(key => data[key])
          .sort((a, b) => a.timestamp - b.timestamp);
          
sortedData.forEach(item => {
    // 1. Aseguramos que las propiedades existan y sean válidas antes de usarlas
    const rawTemperature = item.temperatura;
    const rawTimestamp = item.timestamp;

    // 2. Intentamos convertir la temperatura a número flotante
    // Usamos Number() en lugar de parseFloat para una conversión más estricta si el valor ya es un número en Firebase
    const tempValue = Number(rawTemperature);

    // 3. Validación CRÍTICA: Solo procesamos si tenemos un timestamp y una temperatura válidos
    if (rawTimestamp && !isNaN(tempValue)) {
        
        // El timestamp en tu JSON (1762456293018) es en milisegundos, lo usamos directamente.
        const date = new Date(rawTimestamp);
        
        // Formato de hora legible
        labels.push(date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
        
        // Añadimos el número
        temperatures.push(tempValue);
    } else {
        console.warn(`Dato histórico omitido por ser inválido: ${JSON.stringify(item)}`);
    }
});
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Temperatura (°C)',
              data: temperatures,
              borderColor: 'rgb(255, 99, 132)', // Línea Roja
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Área Roja suave
              tension: 0.4, 
              fill: true, // Rellenar área debajo de la línea
            },
          ],
        });
      } else {
        console.log("No hay datos históricos disponibles.");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error al leer datos históricos de Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolución de la Temperatura (°C)',
        font: { size: 16 },
        color: 'black',
      },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Hora de la Lectura'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Temperatura (°C)'
            },
            min: 15, 
            max: 35  
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-200  shadow-xl rounded-xl p-6 text-center text-gray-600 mt-6 w-full max-w-xl mx-auto">
        Cargando histórico de temperatura...
      </div>
    );
  }

  return (
    <div className="bg-slate-200 shadow-xl rounded-xl p-6 mb-6 w-full max-w-xl mx-auto mt-6 border-slate-300 border-1">
      <div style={{ height: '350px' }}> {/* Contenedor con altura fija para el gráfico */}
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Grafico;