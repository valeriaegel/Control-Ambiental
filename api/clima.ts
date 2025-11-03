// api/clima.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

// 1. Inicialización de Firebase Admin
if (!admin.apps.length) {
    try {
        // Objeto de Service Account construido a partir de las variables de entorno de Vercel
        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // CRÍTICO: Reemplaza \\n por \n para que la clave sea válida (asegúrate de que en Vercel lo copiaste bien)
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'), 
        } as admin.ServiceAccount;

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // Asegúrate de que esta URL está configurada en las variables de entorno de Vercel
            databaseURL: process.env.FIREBASE_DATABASE_URL 
        });
    } catch (e) {
        console.error("Error al inicializar Firebase Admin:", e);
    }
}

const db = admin.database();

/**
 * Endpoint de Vercel para el Fulfillment de Google Assistant
 */
export default async function (request: VercelRequest, response: VercelResponse) {
    // Vercel lo expone como /api/clima
    
    if (request.method !== 'POST') {
        return response.status(405).send('Método no permitido. Google Assistant usa POST.');
    }

    // Ruta de tus datos en la Realtime Database
    // (Según tu imagen, es 'lecturas/actual')
    const refPath = 'lecturas/actual';
    
    try {
        const snapshot = await db.ref(refPath).once('value');
        const datosClima = snapshot.val();
        
        // El formato de los datos es: {humedad: "40.00", temperatura: "24.00", timestamp: "63508"}

        if (datosClima) {
            // 2. Extraer y formatear los valores
            const temp = parseFloat(datosClima.temperatura).toFixed(1); // 24.0
            const hum = parseInt(datosClima.humedad).toString();         // 40

            // 3. Formular la respuesta de voz
            const respuestaVoz = `La temperatura actual es de ${temp} grados Celsius y la humedad es del ${hum} por ciento.`;

            // 4. Responder en formato JSON que espera el Webhook de Google Assistant
            return response.status(200).json({
                fulfillmentText: respuestaVoz,
            });

        } else {
            return response.status(200).json({
                fulfillmentText: 'Lo siento, no pude encontrar datos recientes de temperatura y humedad.',
            });
        }

    } catch (error) {
        console.error("[VERCEL FUNCTION ERROR]:", error);
        return response.status(500).send({
            fulfillmentText: 'Hubo un error interno al consultar los datos del sensor.'
        });
    }
}