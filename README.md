# Hippo Web App


Simple health log to help track medications and  vital information.

## Roadmap

### 23MAY22
- 1.0.0: Initial release
- GitHub repo created
- Docker ready
  
## Stack

- Backend is created using Express and Node
- Postgres is used for the database and Prisma is used as the ORM module
- Frontend is created using Vue.js and is PWA ready
- NGINX is used to proxy the backend

## Run

1. Ensure you have docker installed
2. Use the `run.sh` script to start the app
3. Navigate to [http://localhost](http://localhost) to view
> ports 3000 and 80 are used for API and NGINX

## Development Start

1. Ensure you have docker, node v16 or later, and yarn installed
2. Run `docker compose up -d` to start the Postgres instance
3. Run `yarn` in both the `api` and `client` directory to install dependencies
4. In the `api` directory, run `yarn start` to start the backend
5. In the `client` directory, run `yarn serve` to start the frontend
6. Navigate to [http://localhost:8080](http://localhost:8080) to view the client
7. 
> port 3000 is reserved for the API

## Development Feature Work

Hippo uses typescript to build the frontend and backend, ESLint and Prettier are used to enforce code quality.
> use `prettier --write` and `yarn lint` to run Prettier andESLint in the `client` directory

When ready to build the app, you may use the `build.sh` script in the root directory to build the client and move it to the server directory.

> to both build and run the production build locally, use `run.local.sh` to build and start the appiclation on the local machine
