# 1. Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install only production+dev deps (for building)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_ENV
ENV VITE_ENV=$VITE_ENV

ARG VITE_SENTRY_DSN
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN

ARG VITE_TRACE_TARGET_DEV
ENV VITE_TRACE_TARGET_DEV=$VITE_TRACE_TARGET_DEV

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:stable-alpine
# Remove default site
RUN rm -rf /usr/share/nginx/html/*

# Copy over built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]