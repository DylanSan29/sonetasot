# Usar la imagen base de Node.js para construir la aplicación
FROM node:latest as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json e instalar las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Usar una imagen ligera de Nginx como servidor web
FROM nginx:alpine

# Copiar los archivos de construcción de la aplicación Angular al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 80

# Comando de inicio para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
