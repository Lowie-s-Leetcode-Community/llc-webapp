# How to setup Postgres

- Install Postgres: https://www.postgresql.org/download/windows/
- Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04

- Install Prisma: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql

- Migrate data:

```
cd server
npx prisma migrate dev
```

- Make changes to migration:

```
cd server
npx prisma migrate dev --name <migration-name>
```

- Reset and re-seed DB:

```
cd server
npx prisma db push --force-reset && npx prisma db seed
```

## Note

- Script to seed data will be updated soon. Everytime you have to reset local db, you will need it to seed the new db.
- NEVER delete migration files from other devs. You might need to know how to reset your own migration files when you f-ed up. See here: https://www.prisma.io/docs/orm/prisma-migrate/getting-started.
- 1 PR = 1 migration file, except only a few cases where the PR is too big.
