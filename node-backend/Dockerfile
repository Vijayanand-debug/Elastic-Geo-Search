# base stage
FROM node:20-alpine AS base
WORKDIR /app

# dev stage
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# builder stage
FROM base AS production
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/index.js"]