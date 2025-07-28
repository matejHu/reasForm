# Multistage build: 1. fáze – frontend build
FROM node:20-alpine as frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# 2. fáze – backend + zkopírování postaveného frontendu
FROM node:20-alpine

WORKDIR /app

# Backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend files
COPY backend ./backend

# Copy frontend build do backend/public
COPY --from=frontend /app/frontend/build ./backend/public

WORKDIR /app/backend

# Exponuj port
EXPOSE 4000

# Start backend server
CMD ["node", "index.js"]