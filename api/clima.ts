import { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

// 🛑 IMPORTANTE: Necesitas las credenciales de servicio para Firebase Admin SDK.
// El SDK de Admin no usa las claves públicas VITE_FIREBASE_*.
// Necesitas descargar un archivo serviceAccountKey.json o pasar las claves como variables de entorno.

// 1. Inicializar la app de Firebase Admin
// Asumiremos que has configurado la variable de entorno SERVICE_ACCOUNT_KEY con la clave JSON
// para máxima seguridad.

// Si no quieres descargar el archivo JSON, puedes pasar las claves del JSON como variables de entorno
// (client_email, private_key, project_id, etc.) a Render/Vercel.
// Por simplicidad, usaremos el SDK de Admin, que es el más seguro para el backend.

if (!admin.apps.length) {
  // 🛑 Reemplaza los valores con tu clave de servicio JSON (o usa variables de entorno)
  // ESTO DEBE SER TRATADO COMO UN SECRETO DE BACKEND.
  const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID_ADMIN,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'), // CRÍTICO: Formato de clave
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
  } as admin.ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.VITE_FIREBASE_DATABASE_URL // Usamos la URL que ya tienes en Render
  });
}

const db = admin.database();

/**
 * Endpoint de Vercel que maneja la solicitud de Google Assistant.
 */
export default async function (request: VercelRequest, response: VercelResponse) {
    // 1. Obtener los datos del cuerpo de la solicitud (que enviará Google Assistant)
    // Aunque no procesamos la lógica compleja de Dialogflow, sí respondemos en formato JSON.
    
    const refPath = 'lecturas/actual';
    
    try {
        const snapshot = await db.ref(refPath).once('value');
        const datosClima = snapshot.val();

        if (datosClima) {
            // Extraer y formatear los valores
            const temp = parseFloat(datosClima.temperatura).toFixed(1);
            const hum = parseInt(datosClima.humedad).toString();

            const respuestaVoz = `La temperatura actual es de ${temp} grados Celsius y la humedad es del ${hum} por ciento.`;

            // 2. Responder en formato simple de Webhook
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