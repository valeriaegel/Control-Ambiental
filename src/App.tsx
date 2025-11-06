import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from "./configBD/firebaseConfig"; 
import Humedad from "./Components/Humedad";
import Temperature from "./Components/Temperature";
import Status from "./Components/Status";
import Grafico from './Components/Grafico';


// Interface para el estado (importante para TypeScript)
interface ClimaData {
    temperatura: number;
    humedad: number;
}


export default function App() {
    // 1. Estado para almacenar los datos de Firebase
    const [clima, setClima] = useState<ClimaData>({ temperatura: 0, humedad: 0 });
    const [cargando, setCargando] = useState(true);

    // 2. Efecto para suscribirse a Firebase
    useEffect(() => {
        const climaRef = ref(database, 'lecturas/actual'); 

        // onValue: Escucha en tiempo real
        const unsubscribe = onValue(climaRef, (snapshot) => {
            const data = snapshot.val();
            
            if (data) {
                setClima({
                    temperatura: data.temperatura,
                    humedad: data.humedad,
                });
            } else {
                console.log("No hay datos disponibles en el nodo /lecturas/actual.");
            }
            setCargando(false);

        }, (error) => {
            console.error("Error al leer de Firebase:", error);
            setCargando(false);
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
            
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pasar el valor del estado como prop 'valor' */}
                <Temperature valor={clima.temperatura} />
                <Humedad valor={clima.humedad} />
                <Status valor={clima.temperatura} />
            </div>

            <div className='w-full max-w-5xl mt-8'>
                   <Grafico />
            </div>

        </div>
    )
}