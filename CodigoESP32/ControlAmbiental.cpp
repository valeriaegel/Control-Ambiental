//LIBRERÍAS
// Instala la librería "DHT sensor library" para que ESP32 se comunique y extraiga datos válidos del sensor
#include <DHT.h> 

//CONEXION WIFI:
#include <WiFi.h>
#define SSID ""  // Colocar el SSID de la red Wi-Fi
#define PASSWORD "" // Colocar la contraseña de la red Wi-Fi

//Conexion BD
#include <FirebaseESP32.h>

// CREDENCIALES DE FIREBASE
#define FIREBASE_HOST "" // Colocar URL de  base de datos
#define FIREBASE_AUTH "" // Colocar la clave de autenticación de la base de datos

// Define el objeto FirebaseData  
FirebaseData firebaseData; 

// VARIABLES GLOBALES NECESARIAS PARA FIREBASE
FirebaseConfig firebaseConfig;
FirebaseAuth firebaseAuth;

//DEFINICIÓN DE PINES Y CONFIGURACIÓN
// Pin de datos para el sensor DHT 
#define DHTPIN 21       
// Tipo de sensor utilizado
#define DHTTYPE DHT11  

// Pin para el Buzzer Activo
#define BUZZER_PIN 15    

// Pines del LED RGB 
#define LED_R 25        // Rojo
#define LED_G 26        // Verde
#define LED_B 27        // Azul

// Umbrales de Temperatura y humedad (definidos según el proyecto)
#define TEMP_ALERTA 30.0  // Umbral superior (>= 30°C: ROJO y ALERTA)
#define TEMP_NORMAL 20.0  // Umbral inferior (< 20°C: AZUL)

// Inicialización del sensor
DHT dht(DHTPIN, DHTTYPE);

// FUNCIONES AUXILIARES
//Función para cambiar el color del LED RGB
void setRgbColor(int red, int green, int blue) {
  digitalWrite(LED_R, red);
  digitalWrite(LED_G, green);
  digitalWrite(LED_B, blue);
}

//Funcion para manajer led RGB y buzzer
void actualizarEstadoAmbiental(float temp, float humedad) {
  // Lógica del LED RGB 
  if (temp > TEMP_ALERTA) { 
    // ROJO: si la temperatura es superior a 30 °C (Temp alerta).
    setRgbColor(LOW, LOW, HIGH); 
  } else if (temp >= TEMP_NORMAL) { 
    // VERDE: si la temperatura se encuentra entre 20 y 30 °C.
    setRgbColor(LOW, HIGH, LOW); 
  } else { 
    // AZUL: si la temperatura es inferior a 20 °C.
    setRgbColor(HIGH, HIGH, LOW); 
  }
 // Lógica del Buzzer 
    if (temp > TEMP_ALERTA || humedad > 75.0) { 
        digitalWrite(BUZZER_PIN, HIGH);
        delay(1000); // Buzzer suena por 1 segundo, se puede modificar
        digitalWrite(BUZZER_PIN, LOW);
    } else  {
        digitalWrite(BUZZER_PIN, LOW);
    }
}

// FUNCIÓN ENVÍO DE DATOS A FIREBASE
void enviarDatos(float temp, float hum) {
    if (WiFi.status() == WL_CONNECTED) {
 
        FirebaseJson json;
        json.set("temperatura", temp); 
        json.set("humedad", hum); 
        json.set("timestamp/.sv", "timestamp"); 

        // Guarda el dato como lectura actual y en historico ---
        Firebase.setJSON(firebaseData, "/lecturas/actual", json);
        Firebase.pushJSON(firebaseData, "/lecturas/historial", json);
}
    else {
     Serial.println("Error de conexión WiFi. No se pueden enviar datos a Firebase.");
    }
}


//SETUP Y LOOP
void setup() {
  Serial.begin(115200);
    // CONEXIÓN WI-FI
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        pinMode(BUZZER_PIN, OUTPUT);
}
 // Configuración de Firebase
   firebaseConfig.host = FIREBASE_HOST;
   firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;

    // Inicializa la configuración de Firebase
   Firebase.begin(&firebaseConfig, &firebaseAuth);
    
    // Opcional: para evitar reconexiones Wi-Fi constantes ==> Firebase.reconnectWiFi(true);

    // Configurar pines de salida para LED y Buzzer
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(LED_R, OUTPUT);
    pinMode(LED_G, OUTPUT);
    pinMode(LED_B, OUTPUT);

    // Inicializar sensor DHT
    dht.begin();

    // Asegurar que el LED y Buzzer estén apagados al inicio
    setRgbColor(HIGH, HIGH, HIGH);
    digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  // Espera 2 segundos entre lecturas para evitar errores del sensor
  delay(2000); 

  // Leer Humedad y Temperatura
  float humedad = dht.readHumidity();
  float temperatura = dht.readTemperature();

  // Verificar si la lectura fue exitosa
  if (isnan(humedad) || isnan(temperatura)) {
    Serial.println("¡Error al leer del sensor DHT!");
    return;
  }

  //Reporte de datos en el monitor serial/consola 
  Serial.println("\n--- [Reporte de Datos IoT] ---");
  Serial.print("Temperatura actual: ");
  Serial.print(temperatura);
  Serial.println(" °C");
  Serial.print("Humedad actual: ");
  Serial.print(humedad);
  Serial.println(" %");

  // A. Envío de datos a Firebase
  enviarDatos(temperatura, humedad);
  
  // B. Lógica de Alerta Visual y Sonora
 actualizarEstadoAmbiental(temperatura,humedad);

  // Esperar 2 min antes de la siguiente lectura
  delay(120000); 
}