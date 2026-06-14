FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter backend exec prisma generate

WORKDIR /app/apps/backend

CMD ["pnpm", "start:dev"]