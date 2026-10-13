#  Stage 1 — deps: Installs production dependencies only. Development packages are excluded.
# Start the build stage with Node.js.
FROM node:22-alpine AS deps  

# Set the working directory inside the container like cd /app
WORKDIR /app

# Copy package and lock files into /app.
COPY package*.json .

# install the exact dependencies in the lock file.
RUN npm ci --omit=dev \
    && npm cache clean --force

# -----------------------------------------------------------------------------
# Stage 2 — production: Starts with a clean Node.js image and copies in the dependencies and application entry point.
# The final image does not include the first stage's complete filesystem or its development dependencies.
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
# Copy all backend folders and files
COPY . .

EXPOSE 5000

# Start the server
CMD ["node", "index.js"]