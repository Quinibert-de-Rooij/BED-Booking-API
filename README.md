# BED Final Project by Q.

Dear reader,

Just a brief introduction:
My name is: Quinibert de Rooij
I made this back end repository for the back end assignment for WINC.

However what is a program without some fun? Therefore some customized messaging making it fun.
Some background, or perhaps you figured it already and need some confirmation:
People often shorten my name to Quinn, when that is not enough it gets to Q.
Ofcourse then Q is some smart guy, related to in movies and series: Startrek, James Bond, Q&Q.
Whatever your link is, knowing this hopefully tickles your imagination while testing.

Back to the serious stuff:
This repository contains a functioning API for the Bookings project.
I enhanced the instructions for installing this in a working matter.

## How to get started

On MAC you might want to use `sudo` to make sure you have the root access.

You can clone the repo, install the app

```plaintext
npm install
```

You might want to wait with `nmp run dev` and follow the instructions in:

1. `Starting the App`
2. `Database`

Run the app:

```plaintext
npm run dev
```

## Starting the App

To start the app, follow these steps:

1. Create a `.env` file in the root directory.
2. Replace the values for `AUTH_SECRET_KEY` and `SENTRY_DSN` with your own values.
3. Databse and shadow database required `DATABASE_URL` and `SHADOW_DATABASE_UR`

```plaintext
AUTH_SECRET_KEY=your_secret_key_here
SENTRY_DSN=your_sentry_dsn_here

DATABASE_URL='mysql://your_mysql_db'
SHADOW_DATABASE_URL='mysql://your_mysql_shadow_db'
```

## Database setup:

This app comes with a database scema and seeding.
To do this make sure you have the values set for `DATABASE_URL` and `SHADOW_DATABASE_URL`

If you used `sudo` before, repeat it here. Migrating the DB, will write to cache.

Setup the database schema:

```plaintext
npx prisma migrate dev --name QBook1
```

Seed the database:

```plaintext
npx prisma db seed
```

## Running tests

Tests are created using Newman, a command-line tool that is able to automate execution of Postman-created tests. Therefore, this command will simulate more or less the same tests that we executed during the course (e.g. test if the "happy case" returns 200 or 201 status code, or it returns 404 Not found when we are requesting a non-existing ID).

To run the tests, perform the following steps:

1. Start the server. This can usually be done by running `npm run dev` in the folder you want to test.
2. Go to `postman/environments` folder in the repo. It has a content like this:

```json
{
  "id": "f1936dc5-a5da-47d7-8189-045437f96e9e",
  "name": "Local",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://0.0.0.0:3000",
      "type": "default",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2023-08-11T05:55:13.469Z",
  "_postman_exported_using": "Postman/10.16.9"
}
```

3. If your server is running on a different port or URL, change the value `http://0.0.0.0:3000` to your server's data (this is the default one though).
4. Run the following command

```plaintext
npm test
```

After this, you will see the test results prompted to the terminal. If you have a look at the `package.json` file, you will see that it executes the collection stored in the `postman` folder of the repo root.

Important: When dealing with JSON data, please, make sure that you restart the server with `npm run dev` every time you execute tests! This is important because some tests will remove data via DELETE endpoints and that operation cannot be repeated with the same ID again and again.
