# 🌍 Global Emergency Contacts

Una aplicación web progresiva (PWA) rápida y accesible que proporciona un directorio completo de números de contacto de emergencia (policía, ambulancia, bomberos) para más de 250 países y territorios. Diseñada para viajeros, expatriados y cualquier persona que necesite acceso rápido a información de seguridad crítica, en cualquier parte del mundo.

## ✨ Características Principales

- **Cobertura Global:** Datos de más de 250 países y territorios.
- **Búsqueda Inteligente:** Encuentra países al instante por nombre, código ISO o región.
- **Acceso sin Conexión:** Gracias a la tecnología PWA y un Service Worker, la aplicación funciona incluso sin conexión a internet una vez cargada.
- **Modo Oscuro:** Interfaz cómoda para tus ojos en condiciones de poca luz.
- **Diseño Responsivo:** Experiencia de usuario perfecta en ordenadores, tabletas y móviles.
- **Acciones Rápidas:** Llama directamente o copia números con un solo clic.
- **Arquitectura Separada:** Frontend desacoplado de un backend simple basado en Node.js.

## 🛠️ Stack Tecnológico

- **Frontend:**
  - **Framework:** React
  - **Estilos:** TailwindCSS
  - **Iconos:** Font Awesome
  - **Tipado:** TypeScript
- **Backend:**
  - **Entorno:** Node.js
  - **Framework:** Express.js

## 🚀 Puesta en Marcha

Este proyecto está dividido en dos partes: el **backend** (que sirve los datos) y el **frontend** (la aplicación que ves en el navegador). Necesitas ejecutar ambos para que funcione localmente.

### 1. Requisitos Previos

- Tener instalado [Node.js](https://nodejs.org/) (que incluye npm).
- Un editor de código como [VS Code](https://code.visualstudio.com/).

### 2. Configuración del Backend

El backend es un servidor simple que sirve los datos de `countries.json`.

```bash
# 1. Navega a la raíz del proyecto si no lo estás ya.

# 2. Instala las dependencias del servidor.
npm install

# 3. Inicia el servidor.
node server.js
```
Deberías ver un mensaje que dice `🚀 Servidor backend corriendo en http://localhost:3001`. ¡Deja esta terminal abierta!

### 3. Configuración del Frontend

El frontend es una aplicación de React que consume los datos del backend.

**Importante:** Como no estamos usando un bundler como Vite o Create React App, no puedes simplemente abrir `index.html` en el navegador, ya que las solicitudes a `localhost:3001` fallarían por las políticas de CORS del navegador al servir desde `file:///`.

Necesitas servir los archivos del frontend desde un servidor web local. La forma más fácil es usando `npx serve`.

```bash
# 1. Abre una NUEVA terminal (deja la del backend corriendo).

# 2. Ejecuta el siguiente comando en la raíz del proyecto.
# Si no tienes 'serve', te preguntará si quieres instalarlo. Di que sí (y).
npx serve
```
Esto iniciará un servidor web local (generalmente en un puerto como `http://localhost:3000`). ¡Abre esa URL en tu navegador y la aplicación debería funcionar!

---
Hecho con ❤️ para la comunidad de viajeros.
