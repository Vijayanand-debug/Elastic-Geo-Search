FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json tsconfig*.json ./

# dev stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000


# builder stage
FROM base AS builder
RUN npm ci
COPY src ./src
RUN npm run build

# production stage
FROM base AS production
RUN npm i
COPY --from=builder /app/dist  ./dist
COPY --from=builder /app/public ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]