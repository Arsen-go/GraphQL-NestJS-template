# GraphQL NestJS Sequelize Server Template

- [Src](#src)
  - [config](#config)
  - [constants](#constants)
  - [database](#database)
  - [decorators](#decorators)
  - [filters](#filters)
  - [guards](#guards)
  - [interceptors](#interceptors)
  - [modules](#modules)
  - [plugins](#plugins)
  - [utils](#utils)
  - [validations](#validations)
  - app.module.ts
  - main.ts

## Introduction

This repository is a starter template for building a scalable GraphQL server using **NestJS** and **Sequelize**. It provides a code-first approach for building GraphQL APIs and includes features such as global error handling, logging, caching, and request throttling to ensure smooth server performance.

## Features

- **GraphQL (Code-First)**: Full support for GraphQL APIs using NestJS's `@nestjs/graphql` code-first approach.
- **NestJS**: Modular architecture with dependency injection for scalable server-side applications.
- **Sequelize**: ORM for interacting with relational databases, including support for transactions, migrations, and seeders.
- **Rate Limiting**: Implemented using NestJS’s `@nestjs/throttler` to protect against excessive requests. 
- **Depth Limit**: Limits the maximum query depth to prevent abuse with deeply nested queries.
- **Query Complexity**: Integrated complexity calculation plugin to enforce limits on GraphQL query cost.
- **Caching**: Configured caching mechanism to enhance performance and reduce database load.
- **Global Transaction Interceptor**: Ensures consistent database transactions across requests.
- **Customized GraphQL Playground**: Offers a personalized GraphQL Playground experience.
- **Logging**: Robust logging setup for debugging and monitoring.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Sequelize**: A promise-based Node.js ORM for various SQL databases.
- **GraphQL**: A query language for your API, allowing clients to request only the data they need.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **App Throttler**: Protection against DDoS attacks and high traffic.

## Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **npm** or **yarn**
- **PostgreSQL** (or any other SQL database supported by Sequelize)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/GraphQL-NestJS-template.git
   cd GraphQL-NestJS-template
   yarn
   yarn start:dev
