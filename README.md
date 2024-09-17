<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repo
2. Ejecutar
```
yarn install
```
3. Tenere nest cli instalado
```
npm i -g @nestjs/cli
```
4. Levantar la DB

```
docker-compose up -d
```

5. Clonra el archivo ```__.env.template__``` y renombrar la copia a ```__.env__```

6. LLner las variables de entorno definicas en el ``` .env```

7. Ejecutar la palicaccion en dev:
``` 
yarn start:dev
```
8. Reconstruir la DB con la semilla

```
http://localhost:3000/api/v3/seed
```

## Stack usado
* Mongo
* Nest


