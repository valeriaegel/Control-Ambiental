import React from 'react';

// Definición de la Interface para las Props (Tipado)
interface SensorDataProps {
    valor: number;
}

// Usamos React.FC y aplicamos el tipado a las props
const Temperature: React.FC<SensorDataProps> = ({ valor }) => {
    return (
        <div className="bg-slate-200 shadow-xl py-4 px-6 mb-6 w-full text-center rounded-xl border-slate-300 border-1">
             <div className='w-14 h-14 bg-gradient-to-br from-red-400 mb-2 rounded-xl flex items-center justify-center'>
                <span className='text-white text-2xl'>🌡️ </span>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
                 Temperatura
            </h1>
            <p className="text-4xl font-bold text-slate-800">
                {valor} °C
            </p> 
        </div>
    );
}

export default Temperature;