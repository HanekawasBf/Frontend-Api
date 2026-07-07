# AnimeLat - Frontend

Interfaz web de un catálogo de animes, desarrollada con HTML5, CSS, Bootstrap y JavaScript. Consume una API REST propia (FastAPI) para cargar dinámicamente la información de cada anime (imágenes, sinopsis y video).

- Ortega Plaza Diego
- Matrícula: 2403230009
- Proyecto Integrador - 2do Parcial
- Asignatura: Desarrollo Frontend
- 6to Cuatrimestre - Ingeniería en Desarrollo de Software

## Repositorio del Backend

Este frontend requiere que el backend (API REST) esté corriendo para funcionar correctamente. Repositorio del backend:
`https://github.com/HanekawasBf/Backend-api`

Ambos proyectos se ejecutan de forma independiente y se comunican mediante peticiones HTTP (`fetch`).

## Tecnologías

- HTML5
- CSS3 
- Bootstrap 
- JavaScript

## Estructura del proyecto

```
frontend/
├── index.html            # Página principal / catálogo
├── style.css             # Estilos propios
├── script.js             # Lógica de login, búsqueda y consumo de la API (catálogo)
├── Paginashtml/
│   ├── Jjk.html
│   ├── Konosuba.html
│   ├── Nanbaka.html
│   ├── My_Dress-up.html
│   └── detalle.js         # Lógica de consumo de la API en páginas de detalle
├── img/                   # Imágenes de los animes
├── bootstrap/             # Librería Bootstrap
└── README.md
```

## Requisito previo

El backend debe estar corriendo antes de abrir el frontend, en:
`http://127.0.0.1:8000`

## Ejecución

### 1. Levantar el frontend con Live Server

Abrir la carpeta del proyecto en VS Code y ejecutar la extensión **Live Server** sobre `index.html`.

Por defecto correrá en:
`http://127.0.0.1:5500`

Si tu Live Server usa un puerto distinto, verifica que ese puerto esté agregado en la configuración de CORS del backend (`origins` en `main.py`).

## Acceso a la aplicación

La página cuenta con una pantalla de inicio de sesión simple:

- **Usuario:** `admin`
- **Contraseña:** `12345`

## Funcionamiento general

1. Al cargar `index.html`, `script.js` hace una petición `fetch()` a `http://127.0.0.1:8000/animes`.
2. El catálogo de tarjetas se genera dinámicamente con `innerHTML`, a partir del JSON recibido.
3. Al entrar al detalle de un anime (por ejemplo `Jjk.html?id=4`), `detalle.js` obtiene la información específica desde `http://127.0.0.1:8000/animes/{id}` y la lista de recomendados desde `http://127.0.0.1:8000/animes`.
