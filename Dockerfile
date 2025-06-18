# syntax=docker/dockerfile:1

# ----------- Build arguments -----------
ARG NODE_VERSION=22.14.0
ARG YARN_VERSION=4.6.0

# ----------- Base image -----------
FROM node:${NODE_VERSION} AS base
WORKDIR /app

# ----------- Builder stage -----------
FROM base AS builder
# Enable and prepare Yarn
RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn
WORKDIR /app

# Copy only package.json and yarn.lock for dependency install
COPY --link package.json ./
# If yarn.lock exists, copy it; otherwise, fallback to package-lock.json
# (We check for yarn.lock, but if not present, you would need to adjust this for package-lock.json)
COPY --link yarn.lock ./

# Install dependencies (including dev dependencies for build)
RUN --mount=type=cache,target=${YARN_CACHE_FOLDER} \
    yarn install --frozen-lockfile

# Copy the rest of the source code
COPY --link . .

# Build the Angular app (using the Angular CLI)
RUN yarn build || yarn run build || npx ng build

# ----------- Production image -----------
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy only the built app and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set secure environment defaults
ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

USER appuser

# Expose the default Angular port (adjust if your app uses a different port)
EXPOSE 4200

# Start the Angular app using a static server (http-server is a common choice)
# If you use a custom server, adjust the CMD accordingly
CMD ["npx", "http-server", "./dist", "-p", "4200", "-c-1"]
