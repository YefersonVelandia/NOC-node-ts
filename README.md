# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
```

3. Ejecutar el comando `pnpm i `
4. Levantar las BD con el comando

```
docker compose up -d
```

5. Ejecutar `pnpm run dev`

## Obtener Gmail Key

[Google AppPasswprds](http://myaccount.google.com/u/0/apppasswords)
