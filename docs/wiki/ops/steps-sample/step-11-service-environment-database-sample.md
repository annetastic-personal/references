# Step 11 Sample: Environment and Database (TTGCollector Project)

> **Applies to:** Node service deployments (PERN).

## Purpose

`ttgcollector` stores its data in PostgreSQL and reads its configuration from
an environment file. This example creates the database and the `shared/.env`
file the service loads on startup, so credentials and the session secret stay
off disk and out of git.

## 1. Create the PostgreSQL database

```bash
sudo -u postgres psql -c "CREATE ROLE <app-user> WITH LOGIN PASSWORD '<app-password>';"
sudo -u postgres psql -c "CREATE DATABASE ttgcollector OWNER <app-user>;"
```

## 2. Write the environment file

`/var/www/ttgcollector/shared/.env` (referenced by the systemd
`EnvironmentFile` from Step 10):

```env
NODE_ENV=production
PORT=3001
SESSION_SECRET=<long-random-string>

DB_NAME=ttgcollector
DB_USER=<app-user>
DB_PASSWORD=<app-password>

BGG_API_TOKEN=<your-boardgamegeek-token>
```

> TTGCollector's `config/connection.js` accepts either a single `DB_URL` or the
> discrete `DB_NAME` / `DB_USER` / `DB_PASSWORD` values shown here.

Write the file to `shared/`, not `current/server/`, so the workflow's
`rsync --delete` does not remove it on the next deploy. Restrict it to the
deploy user with `chmod 600`.

## 3. Schema

`server.js` calls `sequelize.sync()` on startup, so the tables are created
automatically from the Sequelize models on the first run. No manual SQL is
needed (the repo's `server/db/schema.sql` is a development-only reference).

## 4. Verify

```bash
sudo systemctl restart ttgcollector
journalctl -u ttgcollector -n 50
```

Confirm the log shows `Server running on http://localhost:3001` with no
database authentication or schema errors.

---

[← Step 10 Sample](https://github.com/annetastic-personal/references/wiki/step-10-run-node-service-sample) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
