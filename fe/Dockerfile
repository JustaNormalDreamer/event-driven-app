FROM node:14-alpine AS builder

ENV REACT_APP_BACKEND_URL="http://localhost:8080/graphql"
ENV REACT_APP_BACKEND_WS_URL="ws://localhost:8080/subscriptions"
ENV REACT_APP_JAVA_BACKEND_URL="http://localhost:8082"
ENV REACT_APP_SUPER_ROLE=Admin
ENV REACT_APP_MINIO_URL="http://localhost:9000/event-management-system"

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copying rest of the application to app directory
COPY . /app

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]