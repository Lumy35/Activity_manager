FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/frontend

CMD ["pnpm", "dev", "--host"]