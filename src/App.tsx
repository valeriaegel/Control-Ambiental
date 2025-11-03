import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from "./configBD/firebaseConfig"; 
import Humedad from "./Components/Humedad";
import Temperature from "./Components/Temperature";


// Interface para el estado (importante para TypeScript)
interface ClimaData {
    temperatura: string | number;
    humedad: string | number;
}


export default function App() {
    // 1. Estado para almacenar los datos de Firebase
    const [clima, setClima] = useState<ClimaData>({ temperatura: '--', humedad: '--' });
    const [cargando, setCargando] = useState(true);

    // 2. Efecto para suscribirse a Firebase
    useEffect(() => {
        const climaRef = ref(database, 'lecturas/actual'); 

        // onValue: Escucha en tiempo real
        const unsubscribe = onValue(climaRef, (snapshot) => {
            const data = snapshot.val();
            
            if (data) {
                setClima({
                    // Temperatura: Usamos parseFloat() y toFixed(1)
                    temperatura: data.temperatura ? parseFloat(data.temperatura).toFixed(1) : '--',
                    // Humedad: Usamos parseInt() para obtener el número entero
                    humedad: data.humedad ? parseInt(data.humedad).toString() : '--',
                });
            } else {
                console.log("No hay datos disponibles en el nodo /lecturas/actual.");
            }
            setCargando(false);

        }, (error) => {
            console.error("Error al leer de Firebase:", error);
            setCargando(false);
            setClima({ temperatura: 'Error', humedad: 'Error' });
        });

        // Limpieza: Detiene la suscripción al desmontar el componente
        return () => unsubscribe(); 

    }, []); 
    
    // Indicador de carga
    if (cargando) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Gestión de Control Ambiental</h1>
                <div className="text-xl text-gray-600 animate-pulse">Conectando y cargando datos en tiempo real...</div>
            </div>
        );
    }

    // 3. Renderizado - Pasando los datos como Props
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
            
            <div className="text-center mb-10 w-full max-w-xl">
                <h1 className="text-4xl font-extrabold text-gray-800">Gestión de Control Ambiental</h1>
            </div>
            
            <div className="w-full max-w-xl">
                {/* Pasar el valor del estado como prop 'valor' */}
                <Temperature valor={clima.temperatura} />
                <Humedad valor={clima.humedad} />
            </div>

        </div>
    )
}