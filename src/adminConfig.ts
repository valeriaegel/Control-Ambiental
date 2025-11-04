// Importamos el SDK de Administrador
import * as admin from 'firebase-admin';

// 1. Obtener la CLAVE SECRETA que configuraste en Render
const serviceAccountString = process.env.FIREBASE_ADMIN_KEY; 

if (!serviceAccountString) {
  // Es vital que esto falle si la clave no está presente
  throw new Error("🚨 ERROR: La variable de entorno FIREBASE_ADMIN_KEY no está definida en el host (Render).");
}

// 2. Parsear el JSON de la clave secreta a un objeto
let serviceAccount: admin.ServiceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountString);
} catch (e) {
  throw new Error("🚨 ERROR: El contenido de FIREBASE_ADMIN_KEY no es un JSON válido.");
}

// 3. Inicializar el Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Usamos la misma URL de tu configuración anterior, es necesaria para la Realtime Database
    databaseURL: "https://sistema-de-control-ambiental-default-rtdb.firebaseio.com"
  });
}

// Exportamos la base de datos de administrador
export const adminDatabase = admin.database();

// El archivo src/firebaseConfig.ts se puede mantener si otras partes de tu proyecto 
// (como un frontend) lo utilizan, pero NO debe ser utilizado por el backend de Render.