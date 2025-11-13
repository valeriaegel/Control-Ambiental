# 🌱 Sistema de Monitoreo Ambiental Inteligente

> **Control Ambiental IoT | ESP32 | Tiempo Real | Firebase**

## 🛠️ Tecnologías
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/) 
[![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/?gclsrc=aw.ds&gad_source=1&gad_campaignid=12302357971&gbraid=0AAAAADpUDOhdoneHpylYKMNUvCQXxmXcp&gclid=CjwKCAiAoNbIBhB5EiwAZFbYGAmsbhzATDQd5y-DHVz2YbsBvDtcDDTIIzE6QRm-LncYlSGIx8HRAhoC9oEQAvD_BwE&hl=es-419) 
 [![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwindcss) ](https://tailwindcss.com/)

## 💡 Sobre el Proyecto

El **Sistema de Monitoreo Ambiental Inteligente** es una solución **IoT (Internet de las Cosas)** diseñada para medir y controlar **temperatura y humedad** en tiempo real. Utiliza un **ESP32** para la captura de datos, integrando **alertas visuales y sonoras** (LED RGB y buzzer). Ademas permite la **visualización remota de datos** a través de un **dashboard web moderno** alojado en Firebase.

**🎯 Propósito:** Optimizar el control ambiental y generar alertas en entornos críticos como salas de servidores, oficinas o laboratorios.

**👉 Ver la aplicación en producción aquí:** [**Sistema de Monitoreo Ambiental**](https://sistema-de-control-ambiental.web.app/)


## 💻 Stack de Software y Componentes

### 💻 Frontend
- **React + TypeScript**: Desarrollo del dashboard interactivo.
- **Tailwind CSS**: Para un diseño responsivo y moderno.
- **react-chartjs-2**: Utilizado para visualizaciones gráficas del historial de lecturas.

### ☁️ Backend / Datos
- **Firebase Realtime Database (RTDB)**: Almacenamiento de datos.

### 🔩 Componentes de Hardware
- **ESP32** (Microcontrolador WiFi): Encargado de la lógica de control y la conexión a la nube.
- **Sensor DHT11**: Módulo de sensor de Temperatura y Humedad.
- **Actuadores**: LED RGB (alerta visual) y Buzzer (alerta sonora) activados por lógica de control.
- **Firmware**: Desarrollado en **C/C++ (Arduino)**.

## ⚙️ Configuración y Despliegue
### 1. Estructura del Proyecto
```
.
├── CodigoESP32             # ⚠️ CÓDIGO DEL FIRMWARE (C++ para ESP32)
├── src                     # CÓDIGO FUENTE del Frontend (React/TypeScript)
├── database.rules.json     # Reglas de seguridad de Firebase Realtime Database
└── ... (otros archivos de config.)
```
### 2. Requisitos Previos

* **Node.js** y **npm**.
* Una cuenta y proyecto activo en **Firebase**.
* **IDE de Arduino**  (para el firmware del ESP32).
* **Hardware:** Se requiere la placa **ESP32**, el sensor y acturadores para el funcionamiento completo.


### 3. Instalación del Código (Frontend/Backend)

```bash
# 1. Clonar el repositorio
git clone [https://github.com/valeriaegel/Control-Ambiental.git](https://github.com/valeriaegel/Control-Ambiental.git)
cd Control-Ambiental

# 2. Instalar dependencias del frontend
npm install
```
### 4. Configuración de Firebase y Variables de Entorno
* Crea un archivo llamado .env.local en la **raíz del proyecto.**
* Configura tus claves públicas de Firebase dentro de .env.local para que el frontend pueda conectarse (VITE_FIREBASE_...).

### 5. Configuración del Hardware (ESP32)
* El código del firmware se encuentra en la carpeta CodigoESP32.
* Abre el código C++ en tu IDE.
* Configura las claves de conexión a WIFI y a Firebase Realtime Database dentro del código.
* Carga el sketch compilado en la placa ESP32.

## 🚀 Ejecución y Uso

### Ejecución Local

Utiliza los siguientes comandos para iniciar el desarrollo y compilar la aplicación:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia la aplicación React en modo de desarrollo local. |
| `npm run build` | Compila la aplicación para producción (genera la carpeta `dist`). |


### Despliegue en Producción

El frontend se aloja completamente en **Firebase Hosting**. Usa el siguiente comando desde consola para desplegar la aplicacion: 

```bash
firebase deploy
```

## 💬 Contribución y Agradecimientos

Desarrollo como proyecto educativo para "Tecnologias para la Automatizacion" con integración **hardware + software + nube**, combinando microcontroladores, sensórica y desarrollo web moderno.


