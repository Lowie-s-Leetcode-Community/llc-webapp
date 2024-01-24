# Using Prisma to manipulate PostgreSQL DB schema

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

- Seed DB

```
npx prisma db seed
```

- Reset and re-seed DB:

```
cd server
npx prisma db push --force-reset && npx prisma db seed
```

## Note

- NEVER delete migration files from other devs. You might need to know how to reset your own migration files when you f-ed up. See here: https://www.prisma.io/docs/orm/prisma-migrate/getting-started.
- 1 PR = 1 migration file, except only a few cases where the PR is too big.
