# Movies Example
![](https://github.com/bpatrzyk/movies-example/workflows/CI/badge.svg)

A demo node.js project - movie database with external API integration.

## Project setup
### Install dependencies
Install dependencies with `yarn`:
```bash
yarn install
```

### Install database
The API requires PostgreSQL server. The easiest way to setup Postgres server is to use docker image, for example:
```bash
docker run -d --name movies -p 5432:5432 -e 'POSTGRES_PASSWORD=p@ssw0rd42' -e 'POSTGRES_DB=movies' postgres
```

### Obtain OMDB API key
The OMDB API key can be obtained here: [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)

### Configure environment variables
The API requires the following environment variables to be configures:

| Variable name | Default value | description |
| --- | --- | --- |
| PORT | - | The port on which the server is exposed |
| DATABASE_URL | - | Postgres connection URL |
| OMDB_API_KEY | - | OMDB API key |
| LOG_LEVEL | `error` | Logger log level |

For development the environment variables can be set with the `.env` file. 
The example content can be found in `.env.example` file.

### Migrate the database
To apply all migrations run the `db:latest` script:
```bash
yarn db:latest
```

### Build the project
```bash
yarn build
```

## Running the project
After all the prerequisites specified in **Project setup** section are configured, the application can be started either in `production` or in `development` mode.
### Starting application for production
Run the following command:
```bash
yarn start
``` 

### Starting application for development
Starting application for development enables reloading the server on source files change.
```bash
yarn dev
```

## Running the tests
### Unit tests
```bash
yarn test
```

### Unit tests with code coverage
```bash
yarn coverage
```
Code coverage covers all source files, even these that are not explicitly tested.

### Linting
With applying fixes:
```bash
yarn lint
```

Without applying fixes (used with CI):
```bash
yarn lint-check
```

## Running the project with Docker
### Building the Docker image
The Docker image with the application can be build using the following command:
```bash
docker build .
```
However, it is recommended to use the image with docker-compose config.

### Docker Compose
The Docker Compose configuration allows to start the server, the database and run the migrations with a single command.

#### Environment variables
The following environment variables need to be configured to use Docker Compose configuration:

| Variable name | Default value | description |
| --- | --- | --- |
| PORT | - | The port on which the server is exposed |
| DATABASE_PASSWORD | - | Postgres database password |
| OMDB_API_KEY | - | OMDB API key |
| LOG_LEVEL | `error` | Logger log level |

They can also be configured with `.env` file.

#### Using docker-compose
The following command builds the images and starts the containers:
```bash
docker-compose up -d
```

All containers can be stopped with the following command:
```bash
docker-compose stop
```

To stop and remove the containers run:
```bash
docker-compose down
```
Please note that it doesn't remove the Postgres data volume `movies-example_postgres-data`. In order to remove the data volume run:
```bash 
docker volume rm movies-example_postgres-data
```

## API documentation
Swagger UI is available at the `/docs` path.
