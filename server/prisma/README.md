# How to setup Postgres

- Install Postgres (I can only verify guide for Ubuntu): (TODO)

- Install Prisma: (TODO)

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

## Note

- Script to seed data will be updated soon. Everytime you have to reset local db, you will need it to seed the new db.
- NEVER delete migration files from other devs. You might need to know how to reset your own migration files when you f-ed up. See here: https://www.prisma.io/docs/orm/prisma-migrate/getting-started.
- 1 PR = 1 migration file, except only a few cases where the PR is too big.
