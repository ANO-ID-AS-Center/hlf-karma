FROM node:14
WORKDIR /application

# Copy global node_modules
COPY ../../node_modules /application/node_modules
# Copy local node_modules
COPY ../../src/packages/application/api/node_modules /application/build/node_modules
# Copy compiled node_modules
COPY ../../src/packages/application/api/build/node_modules /application/build/node_modules
# Copy compiles files to working directory
COPY ../../src/packages/application/api/build/src/packages/application/api /application/build

WORKDIR /application/build
CMD node main.js
