# Build stage for frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Build stage for backend dependencies
FROM node:20-alpine AS backend-builder
WORKDIR /backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/prisma ./prisma
RUN npx prisma generate

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install necessary tools
RUN apk add --no-cache curl

# Copy backend node_modules and code
COPY --from=backend-builder /backend/node_modules ./node_modules
COPY backend ./

# Copy frontend build
COPY --from=frontend-builder /app/dist ./dist

# Copy root package.json
COPY package.json ./

# Create .env.production file (will be overridden at runtime)
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Run migrations and start server
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.ts"]
