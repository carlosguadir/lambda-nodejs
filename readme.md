# Almost Jedi Node


This package contains an API implementation for save pairs and query from a data source.
This implementation works as an serverless lambda function, specifically
is configured with AWS provider, but also works with Azure or Google Cloud

## Live Demo

GET - https://f26t5goga3.execute-api.us-east-1.amazonaws.com/dev/pairs

POST - https://f26t5goga3.execute-api.us-east-1.amazonaws.com/dev/pairs

GET - https://f26t5goga3.execute-api.us-east-1.amazonaws.com/dev/average


## Getting started

```shell
yarn install
```

## Run local enviroment
> ### NOTE
> For run local enviroment you need to add `.env.off` file on root dir with
> the following variables `MONGO_URI` to connect data source to MongoDB.
> Also, you are going to need `MONGO_DB`, provide a name
> for the database on Mongo.
>
> Then you can run local script


```shell
yarn off
```

This command get alive endpoints and cron schedule.
You can test it with postman for endpoints and also see logs events


## Test TDD

> For run tests you need to add `.env.test` file on root dir 
> the variables that you are going to need are the same
> as local enviroment
> 
>  

If you can run mongo container `docker-compose up -d`
with this you can add `.env.test` with next enviroment variables
```shell
MONGO_URI=mongodb://localhost
MONGO_DB=jedi
```

```shell
yarn test
```

## Deploy lambda

You need [configure credentials serverless framework](https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials) on you local machine or 
on your favorite DevOps pipeline provider.

Also the role for the configuration you need to add grants
for Lambda Execution, CloudFormation, API Gateway. You can
give the access on IAM for AWS Provider

Then you can run the command for development
or production stage

```shell
yarn dev
```


## Swagger Docs

This package contains an autogen docs, you can run `yarn docs`
and open [http://localhost:3000/docs](http://localhost:3000/docs)

## Lint

Run standard code configuration ESLint

```shell
yarn lint # Inspect linter
yarn lint:fix # Inspect and autofix linter
```

## Cron Schedule

If you want to change the value for schedule period
go to `serverless.yml` and change rate value on cron function
