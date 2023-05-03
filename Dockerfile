FROM node:18.16.0-bullseye-slim AS builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
RUN npm install &&  npm ci --only=production --omit=dev && npm cache clean --force
FROM gcr.io/distroless/nodejs18-debian11
COPY --from=builder /usr/src/app /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8081
CMD ["app.js"]