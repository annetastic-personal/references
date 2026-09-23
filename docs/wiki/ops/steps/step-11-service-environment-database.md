# Step 11: Configure a Node Service: Environment and Database

> **Applies to:** Node service deployments (PERN, MERN).

Worked example: [Step 11 Sample](https://github.com/annetastic-personal/references/wiki/step-11-service-environment-database-sample)

## Purpose

A Node backend needs configuration and secrets (database credentials, a session
secret, ports, API tokens) and a database to store its data. This step creates
the database and an environment file the service loads at startup, so those
values live outside the repository and are never committed.

## 1. Create the database

### PostgreSQL (PERN)

```bash
sudo -u postgres psql -c "CREATE ROLE <app-user> WITH LOGIN PASSWORD '<app-password>';"
sudo -u postgres psql -c "CREATE DATABASE <app-db> OWNER <app-user>;"
```

### MongoDB (MERN)

```bash
mongosh
```

```js
use <app-db>
db.createUser({
  user: "<app-user>",
  pwd: "<app-password>",
  roles: [{ role: "readWrite", db: "<app-db>" }]
})
```

## 2. Write the environment file

Create the environment file at `/var/www/<project>/shared/.env` — the path
referenced by the systemd `EnvironmentFile` from Step 10 — and fill in the
values you just created:

```env
NODE_ENV=production
PORT=<port>
SESSION_SECRET=<long-random-string>

DB_URL=postgres://<app-user>:<app-password>@localhost:5432/<app-db>
# MERN uses the Mongo driver's URI instead:
# MONGODB_URI=mongodb://<app-user>:<app-password>@localhost:27017/<app-db>
```

- Keep the file in `shared/`, not in the `current/` release tree. `current/`
  is rebuilt from the repository on every deploy (`rsync --delete`), so a file
  placed there would be deleted. `shared/` persists across releases.
- Never commit `.env` — add it to `.gitignore`.
- Restrict it to the deploy user: `chmod 600 /var/www/<project>/shared/.env`.

## 3. Set up the schema

Most ORMs create the schema automatically from their model definitions:

- **Sequelize (PERN):** `sequelize.sync()` on startup creates tables on first run.
- **Mongoose (MERN):** collections are created automatically on first write.

If your app requires raw SQL migrations or a `schema.sql`, run those instead
(for example, `psql -U <app-user> -d <app-db> -f schema.sql`).

## 4. Verify

Start (or restart) the service and confirm it reaches the database with no
authentication or schema errors:

```bash
sudo systemctl restart <service-name>
journalctl -u <service-name> -n 50
```

---

[← Step 10](https://github.com/annetastic-personal/references/wiki/step-10-run-node-service) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index)
