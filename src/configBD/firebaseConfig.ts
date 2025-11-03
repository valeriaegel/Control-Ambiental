// src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Reemplaza con la configuración de tu propio proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNxZA7RoCvdc2qvi9p5HWJlIszVQN_vXk",
  authDomain: "sistema-de-control-ambiental.firebaseapp.com",
  databaseURL: "https://sistema-de-control-ambiental-default-rtdb.firebaseio.com",
  projectId: "sistema-de-control-ambiental",
  storageBucket: "sistema-de-control-ambiental.firebasestorage.app",
  messagingSenderId: "1062266460913",
  appId: "1:1062266460913:web:6bb13525512642a87aa750",
  measurementId: "G-VJ4QW5L6XM"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener una referencia a la Realtime Database
export const database = getDatabase(app);