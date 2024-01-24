# LLC WebApp

This is the Webapp for the Lowie's Leetcode Community.

Quick link for team members: [Trello](https://trello.com/b/uYL1a8Bd/llc-web-agile-board)

## Quick description on Architecture

- Front-end (NodeJS): in main directory, except for `server`.
- Back-end (ReactJS): in `server`.

We followed [this guide](https://burkeholland.dev/posts/express-react-starter-refresh/) while set up this project.

## First-time set-up

### 1. Package installation

```
cd server
npm i
cd ..
npm i
```

Please do not install any new packages on your own if you're not developing features.

### 2. DB Installation:

We use PostgreSQL for our Database. Therefore, if you tend to run the system locally, you'll need to install PostgreSQL.

#### PostgreSQL Module

Windows: https://www.postgresql.org/download/windows/
Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04
MacOS: https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/

#### pgAdmin (to visualize DB, just like MySQL Workbench)

Windows: Included in the DB download above.
Ubuntu: https://www.commandprompt.com/education/how-to-install-pgadmin-on-ubuntu/
MacOS: Included in the guide above.

**Note**: Please follow the guide closely and report to the PM if the above guide has any problem, as previous devs haven't put hands on every OS, and they follows different guides.

### 3. Data Population (seeding)

**IMPORTANT**: Most of seeding data can be found in `server/prisma/backup_json_data`. But since we don't push users' data onto our git, we git-ignored some necessary file for our seeding script to run.

Please see the **Pinned Message** in our [*private* Discord channel](https://discord.com/channels/1085444549125611530/1150291748808044655).

```
cd server
npx prisma migrate dev
npx prisma db seed
```

Reset local DB, in case something bad happened:

```
npx prisma db push --force-reset && npx prisma db seed
```

### 4. Setup `.env` files

There are two `.env` files: in main directory and in `server`. Please check `.env.template` for the fields that you need to fill in.

We use OAuth Discord Authentication for our website. Therefore, it's a bit more complicated. See (`server/README.md`)[server/README.md] for further instruction.

### 5. Boot the application

#### The Back-end

```
cd server
npm run dev
```

Verify initiation successfully: [localhost:3000](http://localhost:3000)

#### The front-end

```
npm start
```

**Notes** (on Ports): I added `PORT` environment variable in the `start` script for the front-end. If it works, you can start both modules in any order. But in case it doesn't (usually, causing the back-end can't start), you should stop any process on port 3000, and start the back-end first, before starting the front-end.

## Linting & Clean code & Workflow

Linting is enforced on all front-end code and adhere to the [AirBNB guidelines](https://airbnb.io/javascript/). Or, their [github link](https://github.com/airbnb/javascript).

### Have fun developing! :D
