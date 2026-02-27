# 📦 Documentação: Deploy do Site Bellys Institucional no EasyPanel

## 📋 Sumário
1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Configurações Realizadas](#configurações-realizadas)
4. [Passo a Passo do Deploy](#passo-a-passo-do-deploy)
5. [Solução de Problemas Comuns](#solução-de-problemas-comuns)
6. [Checklist para Replicar em Outro Projeto](#checklist-para-replicar-em-outro-projeto)

---

## 🎯 Visão Geral

Este projeto é um site institucional construído com:
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + Shadcn/ui + Framer Motion
- **Roteamento**: React Router DOM (SPA - Single Page Application)
- **Build**: Multi-stage Docker (Node.js + Nginx)
- **Hospedagem**: EasyPanel

### Por que funcionou perfeitamente?
✅ Dockerfile otimizado com multi-stage build  
✅ Nginx configurado corretamente para SPA  
✅ Assets estáticos organizados na pasta `public/`  
✅ Cache otimizado para vídeos e imagens  
✅ Imagens grandes hospedadas externamente (GitHub)  

---

## 📁 Estrutura do Projeto

```
Bellys-Institucional/
├── public/                          # Assets estáticos (copiados direto para o build)
│   ├── videos/
│   │   ├── INSTITUCIONAL-CALDEIRA.mp4
│   │   ├── VideoB-cosmectic.mp4
│   │   └── VSL-DESKTOP.mp4
│   ├── favicon-2.ico
│   ├── leandro2.png
│   ├── leandro2-temaclaro.png
│   └── robots.txt
├── src/                             # Código fonte React
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile                       # ⭐ Configuração Docker Multi-Stage
├── docker-compose.yml               # Para testes locais
├── package.json
├── vite.config.ts
└── index.html
```

### 🔑 Pontos Importantes da Estrutura

1. **Pasta `public/`**: Todo conteúdo desta pasta é copiado para a raiz do build
   - Vídeos acessados como: `/videos/INSTITUCIONAL-CALDEIRA.mp4`
   - Imagens acessadas como: `/leandro2.png`
   - Favicon acessado como: `/favicon-2.ico`

2. **Assets Externos**: Imagens pesadas hospedadas no GitHub para economia de recursos
   ```typescript
   // Exemplo no código:
   src="https://github.com/rdriguezFXR/assets-b-cosmetic/blob/main/Assets%20B-Cosmetic/bellys-s.png?raw=true"
   ```

---

## ⚙️ Configurações Realizadas

### 1. Dockerfile (Multi-Stage Build)

O arquivo `Dockerfile` é a peça-chave do sucesso. Ele usa duas etapas:

#### **Stage 1: Build da Aplicação**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm install --prefer-offline --no-audit --progress=false
COPY . .
RUN npm run build
```

**O que acontece aqui:**
- Usa Node.js 20 Alpine (imagem leve)
- Instala dependências
- Executa `npm run build` (gera a pasta `dist/`)
- A pasta `dist/` contém HTML, CSS, JS e os assets do `public/`

#### **Stage 2: Servir com Nginx**
```dockerfile
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx para SPA
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    
    # Headers de segurança
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    
    # Configuração para SPA (CRUCIAL!)
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    
    # Cache de assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    
    # Desabilita cache para HTML
    location ~* \.html$ { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    
    # Configuração para vídeos (IMPORTANTE!)
    location ~* \.(mp4|webm|ogg)$ { \
        expires 30d; \
        add_header Cache-Control "public"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Por que essa configuração é fundamental:**

1. **`try_files $uri $uri/ /index.html;`**
   - Essencial para SPAs com React Router
   - Garante que rotas como `/seja-distribuidor` e `/contato` funcionem
   - Sem isso, recarregar a página em uma rota retornaria erro 404

2. **Cache otimizado**
   - Assets (JS, CSS, imagens): 1 ano (imutáveis)
   - HTML: sem cache (sempre pega a versão mais nova)
   - Vídeos: 30 dias

3. **Headers de segurança**
   - Proteção contra ataques XSS e clickjacking

### 2. Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Pontos importantes:**
- `host: "::"`: Permite acesso externo (necessário para Docker)
- Alias `@`: Facilita imports (`@/components/...`)

### 3. Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview"
  }
}
```

O script `build` gera a pasta `dist/` com tudo otimizado.

### 4. Index.html - Configurações de Performance

```html
<!-- Preconnect para recursos externos -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://github.com" crossorigin />

<!-- Preload de recursos críticos -->
<link rel="preload" href="/src/main.tsx" as="script" />
<link rel="preload" href="/src/index.css" as="style" />

<!-- Favicon com cache busting -->
<link rel="icon" type="image/x-icon" href="/favicon-2.ico?v=2" />
```

---

## 🚀 Passo a Passo do Deploy no EasyPanel

### Pré-requisitos
- [ ] Conta no EasyPanel
- [ ] Repositório Git com o código
- [ ] Dockerfile na raiz do projeto
- [ ] Assets na pasta `public/`

### Passo 1: Criar Novo Projeto no EasyPanel

1. Acesse seu EasyPanel
2. Clique em **"Create Service"** ou **"New App"**
3. Escolha **"Deploy from Git"**

### Passo 2: Configurar o Repositório

1. **Source**: Conecte seu repositório GitHub/GitLab/Bitbucket
2. **Branch**: Selecione a branch principal (geralmente `main` ou `master`)
3. **Root Directory**: Deixe como `.` (raiz do projeto)

### Passo 3: Configurar Build

**Configurações importantes:**

| Campo | Valor | Descrição |
|-------|-------|-----------|
| **Builder** | Docker | Usar o Dockerfile do projeto |
| **Dockerfile Path** | `./Dockerfile` | Caminho para o Dockerfile |
| **Build Context** | `.` | Raiz do projeto |
| **Port** | `80` | Porta exposta pelo Nginx |

### Passo 4: Configurar Domínio

1. Vá em **"Domains"** ou **"Configure Domain"**
2. Adicione seu domínio personalizado ou use o subdomínio fornecido
3. Configure o SSL (EasyPanel geralmente faz isso automaticamente)

### Passo 5: Deploy

1. Clique em **"Deploy"** ou **"Create & Deploy"**
2. Aguarde o build (pode levar 2-5 minutos)
3. Monitore os logs para verificar se está tudo OK

### Passo 6: Verificação

Após o deploy, teste:

✅ **Homepage** carrega normalmente  
✅ **Rotas funcionam**: `/seja-distribuidor`, `/contato`  
✅ **Vídeos carregam**: Verifique se os vídeos de `/videos/` funcionam  
✅ **Imagens aparecem**: Tanto locais quanto do GitHub  
✅ **Favicon aparece**: No título do navegador  
✅ **F5 nas rotas**: Recarregar a página em qualquer rota não dá 404  

---

## 🔧 Solução de Problemas Comuns

### ❌ Problema: Rotas retornam 404 ao recarregar

**Causa**: Nginx não configurado para SPA

**Solução**: Verifique se o Dockerfile tem esta configuração:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### ❌ Problema: Vídeos não carregam

**Causa**: Vídeos não estão na pasta `public/` ou caminho errado

**Solução**:
1. Certifique-se que os vídeos estão em `public/videos/`
2. No código, use o caminho sem `public`: `/videos/nome-do-video.mp4`
3. Verifique se os vídeos foram incluídos no build (pasta `dist/videos/`)

### ❌ Problema: Imagens quebradas

**Causa**: Caminhos incorretos ou assets não copiados

**Solução**:
- **Assets locais**: Coloque em `public/` e use caminho absoluto (`/imagem.png`)
- **Assets do código**: Use caminho relativo ou absoluto com `@/`
- **Assets grandes**: Hospede externamente (GitHub, CDN)

### ❌ Problema: Build falha no EasyPanel

**Causa comum**: Falta de memória ou dependências

**Solução**:
1. Verifique os logs de build
2. Aumente a memória alocada (se disponível)
3. Garanta que `package-lock.json` está commitado
4. Verifique se não há erros de TypeScript

### ❌ Problema: Site fica em branco

**Causa**: Erro no JavaScript ou configuração do Vite

**Solução**:
1. Abra o console do navegador (F12)
2. Verifique se há erros JavaScript
3. Confirme que o `base` no `vite.config.ts` está correto (geralmente não precisa ser definido)

---

## ✅ Checklist para Replicar em Outro Projeto

Use este checklist ao subir um novo projeto no EasyPanel:

### 📦 Preparação do Projeto

- [ ] Criar pasta `public/` na raiz
- [ ] Mover todos os assets estáticos (vídeos, imagens, favicon) para `public/`
- [ ] Atualizar imports no código para usar caminhos corretos
  ```tsx
  // ❌ Errado
  import video from './assets/video.mp4'
  
  // ✅ Correto (se estiver em public/videos/)
  <video src="/videos/video.mp4" />
  ```

### 🐳 Configuração Docker

- [ ] Copiar o `Dockerfile` deste projeto
- [ ] Verificar se a porta 80 está exposta
- [ ] Confirmar configuração do Nginx para SPA
- [ ] Testar build local: `docker build -t teste .`
- [ ] Testar container local: `docker run -p 3000:80 teste`

### 🔧 Configuração Vite

- [ ] Verificar `vite.config.ts` tem `host: "::"` (se usar dev em container)
- [ ] Confirmar aliases funcionam (`@/` para `src/`)
- [ ] Testar build local: `npm run build`
- [ ] Verificar pasta `dist/` gerada corretamente

### 🌐 Deploy no EasyPanel

- [ ] Criar novo serviço no EasyPanel
- [ ] Conectar repositório Git
- [ ] Configurar builder como "Docker"
- [ ] Definir Dockerfile path: `./Dockerfile`
- [ ] Configurar porta: `80`
- [ ] Adicionar variáveis de ambiente (se necessário)
- [ ] Configurar domínio
- [ ] Fazer primeiro deploy

### ✅ Testes Pós-Deploy

- [ ] Homepage carrega
- [ ] Todas as rotas funcionam
- [ ] F5 em rotas não dá erro 404
- [ ] Vídeos reproduzem
- [ ] Imagens aparecem
- [ ] Favicon visível
- [ ] Performance OK (Lighthouse/PageSpeed)
- [ ] Responsivo (mobile/tablet/desktop)
- [ ] SSL ativo (HTTPS)

---

## 📊 Estrutura de Assets - Estratégia Usada

### Assets Locais (na pasta `public/`)
```
public/
├── videos/                    # Vídeos institucionais (~50MB total)
│   ├── INSTITUCIONAL-CALDEIRA.mp4
│   ├── VideoB-cosmectic.mp4
│   └── VSL-DESKTOP.mp4
├── leandro2.png              # Foto usada em componente
├── leandro2-temaclaro.png    # Variante para tema claro
├── favicon-2.ico             # Ícone do site
└── robots.txt                # SEO
```

**Acessados no código como:**
```tsx
<video src="/videos/INSTITUCIONAL-CALDEIRA.mp4" />
<img src="/leandro2.png" />
```

### Assets Externos (GitHub)
```
https://github.com/rdriguezFXR/assets-b-cosmetic/
└── Assets B-Cosmetic/
    ├── bellys-s.png
    ├── b-dourada.png
    ├── banner-quero-ser-consultor-desktop-2.png
    └── ... (outros assets grandes)
```

**Acessados no código como:**
```tsx
<img src="https://github.com/rdriguezFXR/assets-b-cosmetic/blob/main/Assets%20B-Cosmetic/bellys-s.png?raw=true" />
```

### Por que essa estratégia?

✅ **Vídeos locais**: Precisam de carregamento rápido e controle de cache  
✅ **Imagens pequenas locais**: Favicon, fotos essenciais  
✅ **Imagens grandes externas**: Economiza espaço no container e acelera deploy  
✅ **CDN automático**: GitHub serve com CDN global  

---

## 🔐 Variáveis de Ambiente (se necessário)

Se seu projeto precisar de variáveis de ambiente:

### No EasyPanel:
1. Vá em **"Environment Variables"**
2. Adicione suas variáveis:
   ```
   VITE_API_URL=https://api.seusite.com
   VITE_GA_ID=G-XXXXXXXXXX
   ```

### No código Vite:
```typescript
// Acesse com:
const apiUrl = import.meta.env.VITE_API_URL;
```

### No Dockerfile (se precisar passar para o build):
```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
```

---

## 📈 Otimizações Implementadas

### 1. Performance
- ✅ Multi-stage Docker (imagem final ~25MB)
- ✅ Cache agressivo de assets
- ✅ Preconnect para recursos externos
- ✅ Preload de recursos críticos
- ✅ Lazy loading de componentes (onde aplicável)

### 2. SEO
- ✅ Meta tags configuradas
- ✅ robots.txt
- ✅ Sitemap (pode ser adicionado)
- ✅ Open Graph tags

### 3. Segurança
- ✅ Headers de segurança no Nginx
- ✅ SSL automático via EasyPanel
- ✅ Content Security Policy (pode ser adicionado)

---

## 🎯 Comandos Úteis

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

### Docker Local
```bash
# Build da imagem
docker build -t bellys-institucional .

# Rodar container
docker run -p 3000:80 bellys-institucional

# Ver logs
docker logs <container-id>

# Parar container
docker stop <container-id>
```

### Docker Compose (Teste Local)
```bash
# Subir aplicação
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 📝 Notas Finais

### O que fez esse deploy funcionar perfeitamente:

1. ✅ **Dockerfile bem estruturado** com multi-stage build
2. ✅ **Nginx configurado corretamente** para SPA
3. ✅ **Assets organizados** na pasta `public/`
4. ✅ **Caminhos corretos** no código (absolutos para assets em `public/`)
5. ✅ **Cache otimizado** para cada tipo de arquivo
6. ✅ **Headers de segurança** configurados
7. ✅ **Testes locais** antes do deploy

### Para replicar em outro projeto:

1. Copie o `Dockerfile` completo
2. Organize seus assets em `public/`
3. Atualize os caminhos no código
4. Teste localmente com Docker
5. Configure no EasyPanel seguindo os passos acima
6. Deploy e teste todas as funcionalidades

### Suporte e Manutenção:

- **Logs**: Sempre verifique os logs no EasyPanel em caso de problemas
- **Monitoramento**: Configure alertas para downtime
- **Backups**: O EasyPanel geralmente faz backups automáticos
- **Updates**: Para atualizar, basta fazer push no Git (auto-deploy)

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas ao replicar:

1. Verifique os logs de build no EasyPanel
2. Compare seu Dockerfile com este
3. Confirme estrutura da pasta `public/`
4. Teste o build local primeiro
5. Verifique se todas as dependências estão no `package.json`

---

**Documentação criada em:** 20 de Outubro de 2025  
**Projeto:** Bellys Institucional - Grupo Caldeira  
**Status:** ✅ Em produção e funcionando perfeitamente


