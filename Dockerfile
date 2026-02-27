# Stage 1: Build da aplicação
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e configuração npm
COPY package*.json ./
COPY .npmrc ./

# Instala as dependências
RUN npm install --prefer-offline --no-audit --progress=false

# Copia todo o código fonte
COPY . .

# Faz o build da aplicação
RUN npm run build

# Stage 2: Servir com Nginx
FROM nginx:alpine

# Copia os arquivos buildados do stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração customizada do nginx para SPA
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Adiciona headers de segurança \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    \
    # Configuração para SPA (Single Page Application) \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache de assets estáticos \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Desabilita cache para HTML \
    location ~* \.html$ { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Configuração para vídeos \
    location ~* \.(mp4|webm|ogg)$ { \
        expires 30d; \
        add_header Cache-Control "public"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]

