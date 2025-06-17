FROM node:18

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json pnpm-lock.yaml ./

# Instala o gerenciador pnpm e as dependências
RUN npm install -g pnpm && pnpm install

# Copia o restante do projeto, incluindo o .env
COPY . .

# Garante que o .env esteja presente na imagem
COPY .env .env

# Compila a aplicação (gera o /dist necessário para o Strapi start)
RUN pnpm build

# Expõe a porta do Strapi
EXPOSE 1337

# Inicia a aplicação
CMD ["pnpm", "run", "start"]
