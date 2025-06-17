FROM node:18

WORKDIR /app

# Instala pnpm via Corepack (mais confiável e cacheável)
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

# Build (em produção pode ser RUN pnpm build --filter ... dependendo do workspace)
RUN pnpm build

# Porta usada pela Strapi
EXPOSE 1337

# Define variáveis de ambiente via ENV
ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG JWT_SECRET
ARG DATABASE_FILENAME

ENV APP_KEYS=$APP_KEYS \
    API_TOKEN_SALT=$API_TOKEN_SALT \
    ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET \
    JWT_SECRET=$JWT_SECRET \
    DATABASE_FILENAME=$DATABASE_FILENAME

# Inicia a aplicação
CMD ["pnpm", "run", "start"]
