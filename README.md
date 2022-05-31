# Next TS Shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- EL -d, significa **detached**

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/next-ts-shop-database
```

- Reconstruir los modulos de Node y levantar Next

```
yarn
yarn dev
```

## LLenar la base de datos con información de pruebas

Llamará:

```
http://localhost:3005/api/seed
```
