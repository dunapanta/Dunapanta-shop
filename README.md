# Next.js Dunapanta Shop

## Descripción

> ### Aplicación realizada con Nextjs Dunapanta Shop

## Levantar BD

- Ejecutar:

```
docker-compose up -d
```

- El -d significa **detached**, es decir, que el proceso no se detiene al finalizar

* Acceder a `mongodb://localhost:27017`

## Configurar variables de entorno

- Renombrar **.env.example** a **.env**
* Mongo URL local:
```
MONGO_URL=mongodb://localhost:27017/dunapantaShopDB
```

## Llenar base de datos con datos de prueba

- Ejecutar endpoint:

```
http://localhost:3001/api/seed
```
