# Transaction Journal API

Simple transaction notes with Express

## 🔥 Showcase

- [Web Client Repository](https://github.com/rfauzi44/transaction-journal-web)
- [Postman Docs](https://documenter.getpostman.com/view/25042327/2s93m7X2P3)

## 💻 Built with

- [NodeJS](https://github.com/nodejs/node) for the server side scripting
- [Express JS](https://github.com/exprjs/express) for handling HTTP requests and responses
- [JWT](https://github.com/auth0/node-jsonwebtoken) for authentication
- [Postgres](https://github.com/postgres/postgres) for DBMS
- [Sequilize CLI](https://github.com/sequelize/cli) for migration and seeding
- [Docker](https://github.com/docker) for deployment

## 🛠️ Installation Steps

1. Clone this project

```bash
git clone https://github.com/rfauzi44/theauth-api.git
```

2. Create .env file (copy and set from .env.example)

```bash
# APP
APP_PORT=3001
APP_URL=http://localhost

# DATABASE
DB_USER=postgres
DB_HOST=localhost
DB_NAME=tj
DB_PASSWORD=password 
DB_PORT=5432

# MISC
JWT_SECRETS=secret
```

3. Install dependencies

```bash
npm install
```

4. Running Migrations

```bash
npx sequelize-cli db:migrate
```

5. [ OPTIONAL ] Running Seeds for transactions and items table

Make sure you have create account 

```bash
npx sequelize-cli db:seed:all
```

6. Start the server

```bash
npm start
```

🌟 You are all set!. Test your localhost:APP_PORT
<br>
🔥 Make sure also install [Web Client](https://github.com/rfauzi44/transaction-journal-web) for full stack experience
