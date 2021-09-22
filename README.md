# ImovelIdeal

### Required
1. NodeJs and NPM
2. Docker and Docker-compose

### Pre usage
```bash
npm install
```

### Elastic search usage

1. Copy env-example to .env

2. Up the elastic service

```bash
docker-compose up -d elastic
```

3. Add data to elastic search

```bash
curl -H "Content-Type: application/json" -XPOST "http://localhost:9200/imovel-ideal/real-estate/" -d "{ \"totalPriceRent\" : null, \"priceSale\" : 300000, \"productType\" : \"apartament\", \"neighborhood\" : \"Pitanguinha\", \"isToRent\" : 0, \"isToSell\" : 1, \"state\" : \"AL\", \"city\" : \"Maceió\", \"street\" : \"Avenida Pedro Alvares\", \"number\" : \"223\", \"photos\" : [{\"url:\": \"https://betaimages.lopes.com.br/realestate/med/REO400396/A207BF6D761C2F113158BA5B69EECF7E.JPG\"}, {\"url:\": \"https://betaimages.lopes.com.br/realestate/med/REO400396/10E26BA74B13310994496729186DAD89.JPG\"}]}"
curl -H "Content-Type: application/json" -XPOST "http://localhost:9200/imovel-ideal/real-estate/" -d "{ \"totalPriceRent\" : 3000, \"priceSale\": 500000, \"productType\" : \"house\", \"neighborhood\" : \"Farol\", \"isToRent\" : 1, \"isToSell\" : 1, \"state\" : \"AL\", \"city\" : \"Maceió\", \"street\" : \"Avenida Fernandes Lima\", \"number\" : \"223\", \"photos\" : [{\"url:\": \"https://betaimages.lopes.com.br/realestate/med/REO400396/A207BF6D761C2F113158BA5B69EECF7E.JPG\"}, {\"url:\": \"https://betaimages.lopes.com.br/realestate/med/REO400396/10E26BA74B13310994496729186DAD89.JPG\"}]}"
curl -H "Content-Type: application/json" -XPOST "http://localhost:9200/imovel-ideal/real-estate/" -d "{ \"totalPriceRent\" : 2100, \"priceSale\": null, \"productType\" : \"house\", \"neighborhood\" : \"Feitosa\", \"isToRent\" : 1, \"isToSell\" : 0, \"state\" : \"AL\", \"city\" : \"Maceió\", \"street\" : \"Avenida Governador Lamenha\", \"number\" : \"223\", \"photos\" : [{\"url:\": \"https://betaimages.lopes.com.br/realestate/med/REO400396/A207BF6D761C2F113158BA5B69EECF7E.JPG\"}, {\"url:\": \"https://betaimages.lopes.com.br/realestate/med/REO400396/10E26BA74B13310994496729186DAD89.JPG\"}]}"
```

4. Run the mariadb database

```bash
docker-compose up -d mariadb
```

5. Run the api

```bash
npx nx serve api
```

6. Open endpoint in the browser: http://localhost:3333/api/hello

-----------------------------------------------------------------------------------------------

### Deploy

1. Instalar o serverless:

```bash
npm install -g serverless
```

2. Para fazer o deploy execute o comando:

```bash
serverless deploy
```

- Para mostrar os eventos em tempo real adicione:
```bash
--verbose
```


-----------------------------------------------------------------------------------------------


# OLDER -- DON'T SEE

This project was generated using [Nx](https://nx.dev).


🔎 **Smart, Extensible Build Framework**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@imovel-ideal/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.






## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.