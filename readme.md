# Almost Jedi Node

This package contains an API implementation for save pairs and query from a data source.
This implementation works as an serverless lambda function, specifically
is configured with AWS provider, but also works with Azure or Google Cloud

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

> ### NOTE
> For run tests you need to add `.env.test` file on root dir 
> the variables that you are going to need are the same
> as local enviroment
> 
> Then you can run test script
>  

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
