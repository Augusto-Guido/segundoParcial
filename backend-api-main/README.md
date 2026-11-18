# UnaHur Anti-Social Net — Frontend

Interfaz de usuario de la red social **UnaHur Anti-Social Net**, desarrollada con React + TypeScript + Vite para la materia **Construcción de Interfaces de Usuario** (UNAHUR, 2026).

Permite navegar publicaciones, ver su detalle, comentar, registrarse, iniciar sesión (simulado), ver el perfil propio y crear publicaciones con imágenes y etiquetas.

## Funcionalidades

- Login simulado: se verifica el nickName con `GET /users` y la contraseña fija `123456` se valida localmente. La sesión se guarda en un contexto global (`useContext`) y en `localStorage`.
- Registro de usuarios con validación de campos y muestra de errores del servidor.
- Home con feed de publicaciones recientes y filtro por etiquetas.
- Detalle de publicación (`/post/:id`) con imágenes, etiquetas y comentarios, y formulario para comentar.
- Perfil (ruta protegida) con las publicaciones del usuario y botón de cerrar sesión.
- Crear publicación (ruta protegida) con descripción, URLs de imágenes y etiquetas.

## Tecnologías

React · TypeScript · Vite · react-router · Bootstrap / React-Bootstrap · Fetch API · Oxlint

## API utilizada

Se usa la API de la cátedra (backend Node.js, tomada como caja negra):
https://github.com/lucasfigarola/backend-api

Por defecto el frontend apunta a `http://localhost:3001`.

## Cómo correrlo en local

### 1. Backend
```bash
git clone https://github.com/lucasfigarola/backend-api
cd backend-api
npm install
npm start
```
Queda en `http://localhost:3001`.

### 2. Frontend
```bash
cd unahur-frontend
npm install
cp .env.example .env
npm run dev
```
Abrir `http://localhost:5173`.

Si la API corre en otra URL, editar `VITE_API_URL` en el archivo `.env`.

### Scripts
| Comando | Descripción |
|---|---|
| `npm run dev` | Modo desarrollo |
| `npm run build` | Chequeo de tipos + build de producción |
| `npm run lint` | Linter (Oxlint) |

## Login de prueba

Usar el nickName de cualquier usuario existente (o registrar uno nuevo) con la contraseña `123456`.

## Estructura

```text
src/
├── assets/       # imágenes
├── components/   # componentes reutilizables
├── context/      # AuthContext y ToastContext
├── hooks/        # useAuth, useToast, useUsersMap, ...
├── pages/        # Home, Login, Register, PostDetail, Profile, NewPost
├── services/     # api.ts (llamadas a la API)
├── types/        # interfaces TypeScript
└── utils/        # helpers
```

## Integrantes

Ferrero Facundo, Salinas Enzo, Guido y Spano Augusto, Janse Imanol

Universidad Nacional de Hurlingham — Construcción de Interfaces de Usuario, 2026