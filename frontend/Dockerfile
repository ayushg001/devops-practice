#  Stage 1: Build the React application
# Start the build stage with Node.js.
FROM node:22-alpine AS build  

# Set the working directory inside the container like cd /app
WORKDIR /app

# Copy package and lock files into /app.
COPY package*.json .

# install the exact dependencies in the lock file.
RUN npm ci

# Copy the frontend source code.
COPY . .

# Compile React into production files inside dist/.
RUN npm run build
# -----------------------------------------------------------------------------

# Stage 2: Serve the production build
FROM node:22-alpine AS production

WORKDIR /app

# Install a static file server
RUN npm install -g serve

# Copy build files from Stage 1
COPY --from=build /app/dist ./dist

EXPOSE 5173 

# Start the server
CMD ["serve", "-s", "dist", "-l", "5173"]