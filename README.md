# 🌱 Sistema de Monitoreo Ambiental Inteligente

> **Control Ambiental IoT con ESP32 + Firebase + React**

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)       ![TypeScript](https://img.shields.io/badge/Lenguaje-TypeScript-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?logo=firebase) ![Firebase Hosting](https://img.shields.io/badge/Hosting-Firebase%20Hosting-FFCA28?logo=firebase) ![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss)

---

## 🧭 Descripción general

El **Sistema de Monitoreo Ambiental Inteligente** es una aplicación **IoT (Internet de las Cosas)** que mide **temperatura y humedad en tiempo real** mediante un **ESP32** conectado a sensores ambientales.  
El sistema integra **alertas visuales y sonoras** (LED RGB y buzzer) y permite la **visualización remota de datos** a través de un **dashboard web moderno** alojado en Firebase/Vercel.

---

## 🎯 Propósito

Optimizar el control ambiental en entornos críticos como **salas de servidores, oficinas o laboratorios**.

---

## 🧩 Tecnologías utilizadas

### 💻 Frontend
- **React + TypeScript**
- **Tailwind CSS** para el diseño responsivo
- **react-chartjs-2** para visualizaciones gráficas

### ☁️ Backend / Datos
- **Firebase Realtime Database (RTDB)** para el almacenamiento de lecturas actuales e históricas  
- **Firebase Admin SDK** para el fulfillment y la gestión del backend

### ⚙️ Hardware / Control
- **ESP32** (microcontrolador WiFi)
- **Sensor KY-015** (Temperatura y Humedad)
- **LED RGB** (alerta visual)
- **Buzzer** (alerta sonora)
- **C/C++ (Arduino)** para el firmware del dispositivo

---

## ⚙️ Instalación y Ejecución

La instalación se divide en tres entornos: **hardware**, **frontend** y **backend**.

### 🖥️ Instalación (Frontend)

| Comando | Descripción |
|----------|--------------|
| `git clone https://github.com/valeriaegel/Control-Ambiental.git` | Clonar el repositorio |
| `npm install` | Instalar dependencias |
| Crear archivo `.env.local` | Configurar las claves de Firebase (`VITE_FIREBASE_...`) para desarrollo local |

### 🚀 Ejecución

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Ejecuta el entorno de desarrollo |
| `npm run build` | Compila para producción (crea carpeta `dist`) |

---

## 🔑 Dependencias Externas Críticas

| Dependencia | Uso | Tipo |
|--------------|-----|------|
| **Firebase Realtime Database** | Almacenamiento de datos (`/lecturas/actual` y `/lecturas/historial`) | Base de Datos NoSQL |
| **Credenciales Firebase** | Claves públicas (`VITE_...`) y privadas (`FIREBASE_PRIVATE_KEY`) | Variables de entorno |
| **Firebase Hosting** | Hosting del frontend | Plataforma de despliegue |


---

## 🧑‍💻 Uso

El sistema puede operarse mediante una **interfaz gráfica (dashboard web)**

### 📈 Interfaz Gráfica (Dashboard React)

- **Acceso:** URL desplegada en Firebase Hosting  
- **Diseño:** Estilo moderno con Tailwind CSS  
- **Función:** Muestra tres componentes principales y un gráfico de línea con lecturas históricas

| Vista | Componente | Datos Leídos | Descripción |
|-------|-------------|---------------|--------------|
| **Medición** | `Temperature.tsx`, `Humedad.tsx` | Temperatura, Humedad (`lecturas/actual`) | Lectura en tiempo real |
| **Estado** | `Status.tsx` | Normal / Baja / Alta | Lógica de control: < 20°C → *Baja*, > 30°C → *Alta* |
| **Gráfico** | `Grafico.tsx` | `lecturas/historial` | Evolución de temperatura en el tiempo |

---
## 🌐 Despliegue

El proyecto se aloja completamente en **Firebase Hosting**, aprovechando su integración nativa con **Firebase Realtime Database**.  
El comando de despliegue es:

```bash
firebase deploy

```
[🔗 App en producción](https://sistema-de-control-ambiental.web.app/)


---

## 💬 

Desarrollado como proyecto educativo para "Tecnologias para la Automatizacion" de **control ambiental IoT** con integración **hardware + software + nube**, combinando microcontroladores, sensórica y desarrollo web moderno.


