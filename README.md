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


### Deploy front-end

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

### Deploy api 

1. Buildar o container da aplicação:

```bash
docker build -t registry.gitlab.com/imovel-ideal/imovel-ideal/api .
```

2. Login no registry e envio da imagem:

```bash
docker login registry.gitlab.com -u @user -p senha
docker push registry.gitlab.com/imovel-ideal/imovel-ideal/api
```

3. Deploy na api via container - puxando o container

```bash
docker pull registry.gitlab.com/imovel-ideal/imovel-ideal/api
docker logout
docker-compose --compatibility up --remove-orphans -d
docker image prune -f
```
