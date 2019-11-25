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
