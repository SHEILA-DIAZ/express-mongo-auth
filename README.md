# Laboratorio 08: Express, MongoDB Atlas y JWT

API de autenticación y perfiles basada en el [laboratorio 07](https://github.com/SHEILA-DIAZ/Sem07--express-mongo-auth), organizada en modelos, repositorios, servicios, controladores y rutas. Incluye vistas EJS, contraseñas con bcrypt y autenticación JWT con roles `user` y `admin`.

## Ejecución local

1. Instalar dependencias con `npm install` (`npm.cmd install` en PowerShell).
2. Copiar `.env.example` a `.env`, configurar `MONGO_URI` para `auth_cloud_database` y generar un `JWT_SECRET` aleatorio de al menos 32 caracteres.
3. Ejecutar `npm run dev` (`npm.cmd run dev` en PowerShell).

El servidor escucha en el puerto `3000` después de conectarse a MongoDB.
Las credenciales de `.env` están excluidas del repositorio.

## Rutas

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | `/health` | Comprobar que el API está activo |
| POST | `/api/auth/signUp` | Registrar un usuario |
| POST | `/api/auth/signIn` | Obtener un JWT |
| GET | `/api/users/me` | Consultar el perfil con JWT |
| PUT | `/api/users/me` | Actualizar los campos del perfil con JWT |
| GET | `/api/users` | Listar usuarios, requiere rol admin |
| GET | `/api/users/:id` | Consultar un usuario, requiere rol admin |

Ejemplo para crear un usuario:

```json
{
  "name": "Sheila Diaz",
  "lastName": "Diaz",
  "phoneNumber": "999999999",
  "birthdate": "2000-01-01",
  "email": "sheila.jwt@example.com",
  "password": "Laboratorio08@"
}
```

## Despliegue en Render

- Servicio: Web Service con runtime Node.
- Build Command: `npm ci`.
- Start Command: `npm start`.
- Variables de entorno: `MONGO_URI`, apuntando a `auth_cloud_database`; `JWT_SECRET` generado; `JWT_EXPIRES_IN=1h`; `BCRYPT_SALT_ROUNDS=10`.
- Plan: Free.

Las rutas protegidas requieren `Authorization: Bearer <token>`. La contraseña debe tener al menos ocho caracteres, una mayúscula, un número y un carácter especial entre `# $ % & * @`.

Las vistas están disponibles en `/signIn`, `/signUp`, `/dashboard-user`, `/dashboard-admin` y `/profile`. El registro público asigna únicamente el rol `user`; no se crea un administrador con contraseña predeterminada.

## CI/CD

El workflow `.github/workflows/deploy.yml` instala dependencias, revisa sintaxis e importaciones y solicita el despliegue del mismo commit mediante el secret `RENDER_DEPLOY_HOOK_URL`. El estado final del despliegue se comprueba en Render. Configurar Auto-Deploy en Off para evitar despliegues duplicados.

## Enlaces

- API: https://express-auth-diaz.onrender.com
- Repositorio: https://github.com/SHEILA-DIAZ/express-mongo-auth
- La versión CRUD inicial y la comprobación de CI/CD están conservadas en el historial de Git.
