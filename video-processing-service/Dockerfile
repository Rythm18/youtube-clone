# Stage 1: Builder
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

# Install build dependencies
RUN apt-get update && apt-get install -y ffmpeg

# Install all dependencies, including devDependencies
RUN npm install

COPY . .

# Run the build process
RUN npm run build

# Stage 2: Production
FROM node:18

# Install runtime dependencies
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built artifacts from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "serve"]
