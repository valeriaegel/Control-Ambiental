// server.ts

import express, { Request, Response } from 'express';
// Importamos la base de datos de administrador que creaste en configBD
import { adminDatabase } from './adminConfig'; 

// Inicializamos la aplicación Express
const app = express();
const port = process.env.PORT || 3000; // Render usará la variable PORT para el despliegue

app.use(express.json());

// =============================================================
// RUTA DEL WEBHOOK PARA IFTTT
// URL Pública en Render: https://tuhosting.onrender.com/api/temperatura-webhook
// =============================================================
app.get('/api/temperatura-webhook', async (req: Request, res: Response) => {
  try {
    // AJUSTA ESTA RUTA si la ubicación de tu dato en Firebase es diferente
    const ref = adminDatabase.ref('ambiente/temperatura');
    
    // Leer el valor UNA SOLA VEZ
    const snapshot = await ref.once('value');
    const temperatura = snapshot.val(); // Obtiene el valor actual

    if (temperatura === null || typeof temperatura === 'undefined') {
      console.error("Dato de temperatura no encontrado.");
      return res.status(404).send("Lo siento, no pude obtener la lectura del sensor.");
    }
    
    // Formatear la respuesta de voz
    const respuestaVoz = `La temperatura actual en el ambiente es de ${temperatura} grados centígrados.`;

    // Devolver la respuesta como TEXTO SIMPLE (status 200)
    res.status(200).send(respuestaVoz);
    
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Ha ocurrido un error en el servidor al leer los datos.");
  }
});

// Ruta de prueba (ruta raíz)
app.get('/', (req, res) => {
    res.send('Servicio Webhook de Control Ambiental activo.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`⚡️ Servidor de Webhook iniciado en el puerto ${port}`);
});