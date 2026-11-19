# Anti-SocialNet — Frontend

Aplicación web desarrollada con **React**, **TypeScript** y **Vite** que constituye la interfaz de usuario de la red social universitaria **Anti-SocialNet**.

## Tecnologías y herramientas

* **Biblioteca UI:** React (`.tsx`)
* **Lenguaje:** TypeScript (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)
* **Empaquetador y servidor de desarrollo:** Vite (`vite.config.ts`)
* **Linter:** Oxlint (`.oxlintrc.json`)
* **Estilos:** CSS (`src/index.css`)

### Repositorio a clonar 

https://github.com/Augusto-Guido/segundoParcial.git

## 📂 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Augusto-Guido/segundoParcial.git
```

2. Entrar a la carpeta del frontend:

```bash
cd segundoParcial/unahur-frontend
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el modo desarrollo:

```bash
npm run dev
```

La app queda en `http://localhost:5173`.

```bash
npm install
```

4. Iniciar modo desarrollo:

```bash
npm run dev
```


### Configurar variables de entorno:
Crea un archivo .env en la raíz de unahur-frontEnd/ apuntando a la URL donde corre el servidor backend (verifica el nombre exacto de la variable en src/services/api.ts):


## Estructura del proyecto

```text
unahur-frontEnd/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .oxlintrc.json
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
### Integrantes 
Ferrero Facundo, Salinas Enzo, Guido y Spano Augusto, Janse Imanol

Universidad Nacional de Hurlingham, Construccion de interfaces, 2026