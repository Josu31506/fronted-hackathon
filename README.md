# CampusRoom

CampusRoom es un frontend responsivo para una plataforma de alojamiento universitario. Está construido con **Vite + React + TailwindCSS**, usando una paleta moderna y componentes reutilizables listos para integrarse con APIs reales.

## Requisitos
- Node.js 18+
- npm 9+

## Cómo ejecutar el proyecto
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre el navegador en la URL indicada por Vite (por defecto http://localhost:5173).

## Características principales
- **Autenticación mock**: formularios de login y registro con validaciones básicas y manejo de sesión simulado vía contexto.
- **Publicación de avisos**: formulario para crear avisos con título, precio, dirección y descripción; los datos se almacenan en estado local.
- **Mapa interactivo con Google Maps**: carga el mapa real si configuras tu API Key (VITE_GOOGLE_MAPS_API_KEY) y muestra marcadores para los avisos mock.
- **Listado de habitaciones**: tarjetas con imagen, ubicación, precio y CTA de detalles.
- **Navegación**: barra superior fija con rutas para Inicio, Avisos, Mapa y Login.

## Estructura
```
src/
├── assets/          # Recursos estáticos como el logo
├── components/      # Navbar, formularios, tarjetas y mapa
├── context/         # AuthContext con estado mock
├── data/            # Datos de ejemplo para avisos
├── pages/           # Páginas principales y vistas de mapa/listados
├── routes/          # Definición de rutas con React Router v6
├── types/           # Tipos compartidos
└── index.css        # Estilos base con Tailwind y fuente Inter
```

> Toda la interfaz está en español y la información se encuentra mockeada; no hay backend conectado.

## Integración con Google Maps
1. Solicita una clave en la [Google Cloud Console](https://console.cloud.google.com/) y habilita **Maps JavaScript API**.
2. Crea un archivo `.env` en la raíz del proyecto y agrega:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
   ```
3. Reinicia `npm run dev` para que la clave se cargue y se renderice el mapa. Si la clave falta o hay un error de carga, verás un aviso en la sección de mapa.
