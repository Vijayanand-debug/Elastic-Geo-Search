# base stage
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install

# dev stage
FROM base AS development
COPY . .
EXPOSE 5173

# prod build stage
FROM base AS builder
COPY . .
RUN npm run build

# production stage 
FROM nginx:1.27-alpine AS production
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
