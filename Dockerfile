# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy the built output from the builder
COPY --from=builder /app ./

# Expose the port Next.js runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

