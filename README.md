# Laboratorio 08: Express y MongoDB Atlas

API de usuarios organizada en modelos, repositorios, servicios, controladores y rutas.

## Ejecución local

1. Instalar dependencias con `npm install` (`npm.cmd install` en PowerShell).
2. Copiar `.env.example` a `.env` y configurar `MONGO_URI` con las credenciales y el host del clúster de Atlas.
3. Ejecutar `npm run dev` (`npm.cmd run dev` en PowerShell).

El servidor escucha en el puerto `3000` después de conectarse a MongoDB.
Las credenciales de `.env` están excluidas del repositorio.

## Rutas

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | `/health` | Comprobar que el API está activo |
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/:id` | Consultar un usuario |
| POST | `/api/users` | Crear un usuario |
| PUT | `/api/users/:id` | Actualizar un usuario |
| DELETE | `/api/users/:id` | Eliminar un usuario |

Ejemplo para crear un usuario:

```json
{
  "name": "Sheila Diaz",
  "email": "sheila@example.com"
}
```

## Despliegue en Render

- Servicio: Web Service con runtime Node.
- Build Command: `npm ci`.
- Start Command: `npm start`.
- Variable de entorno: `MONGO_URI`, apuntando a `my_cloud_database`.
- Plan: Free.

Esta primera etapa corresponde al API CRUD del laboratorio 08. La tarea de JWT utiliza como base el proyecto del laboratorio 07.
