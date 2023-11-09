<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Nest Js Boilerplate Code for TypeOrm, Swagger, Firebase, and Typescript. Includes Authentication with role selection and many more features.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
## Migration

```bash
# Generate migration
$ npx typeorm migration:generate src/migrations/<NAME OF MIGRATION> -d dist/db/typeorm.datasource.js 

# Show Pending Migrations
$ yarn db:migration:show

# Run Pending Migrations
$ yarn db:migration:run

# Sync DB (DON'T USE IN PRODUCTION)
$ yarn db:sync

# DROP DB (DON'T USE IN PRODUCTION)
$ yarn db:drop
```


## License

Nest is [MIT licensed](LICENSE).
