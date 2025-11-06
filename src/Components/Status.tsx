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
        estado = "Baja";
        colorText = "blue";
    } else if (valor>=20 && valor<30) {
            estado = "Normal";
            colorText = "green";
            } else {
              estado = "Alta";
              colorText = "red";
            }
        

    return (
        <div className="bg-white shadow-xl rounded-xl py-10 px-8 mb-6 w-full text-center">
            <h1 className="text-3xl font-bold text-black mb-4">
                Estado
            </h1>
            <p className="text-4xl font-extrabold " style={{ color: colorText }}>
                {estado}
            </p> 
           
        </div>
    );
}

export default status;