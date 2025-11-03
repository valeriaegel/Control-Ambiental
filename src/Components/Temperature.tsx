import React from 'react';

// Definición de la Interface para las Props (Tipado)
interface SensorDataProps {
    valor: string | number;
}

// Usamos React.FC y aplicamos el tipado a las props
const Temperature: React.FC<SensorDataProps> = ({ valor }) => {
    return (
        // Los estilos de Tailwind se mantienen
        <div className="bg-white shadow-xl rounded-xl py-10 px-8 mb-6 w-full text-center">
            <h1 className="text-3xl font-bold text-black mb-4">
                🌡️ Temperatura
            </h1>
            {/* Usamos el valor del prop */}
            <p className="text-5xl font-extrabold text-black">
                {valor} °C
            </p> 
        </div>
    );
}

export default Temperature;