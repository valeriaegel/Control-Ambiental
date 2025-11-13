import React from 'react';

// Definición de la Interface para las Props (Tipado)
interface SensorDataProps {
    valor: number ;
}

// Usamos React.FC y aplicamos el tipado a las props
const status: React.FC<SensorDataProps> = ({ valor }) => {

    let estado: string;
    let colorText: string;

 if (valor<20) {
        estado = "Temperatura Baja";
        colorText = "blue";
    } else if (valor>=20 && valor<30) {
            estado = "Temperatura Óptima";
            colorText = "green";
            } else {
              estado = "Temperatura Alta";
              colorText = "red";
            }
        

    return (
        <div className="bg-slate-200 shadow-xl rounded-xl py-10 px-8 mb-6 w-full text-center border-slate-300 border-1">
            <div
                className='w-14 h-14 bg-gradient-to-br from-slate-400 mb-2 rounded-xl flex items-center justify-center '>
                <span className='text-white text-2xl'>ⓘ</span>
                </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
                Estado
            </h1>
            <p className="text-4xl font-bold " style={{ color: colorText }}>
                {estado}
            </p> 
           
        </div>
    );
}

export default status;