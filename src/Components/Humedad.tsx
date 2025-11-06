import React from 'react';

// Definición de la Interface para las Props (Tipado)
interface SensorDataProps {
    valor: number;
}

// Usamos React.FC y aplicamos el tipado a las props
const Humedad: React.FC<SensorDataProps> = ({ valor }) => {
    return (
        <div className="bg-white shadow-xl rounded-xl py-10 px-8 mb-6 w-full text-center">
            <h1 className="text-3xl font-bold text-black-100 mb-4">
                💧 Humedad
            </h1>
            <p className="text-5xl font-extrabold text-black-100">
                {valor}%
            </p> 
        </div>
    );
}

export default Humedad;