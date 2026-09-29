# Step 9: Configure a Node Service: Environment and Database

> **Applies to:** Node service deployments (PERN, MERN).

Worked example: [Step 9 Sample](https://github.com/annetastic-personal/references/wiki/step-9-service-environment-database-sample)

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

> **Runs on:** the server — SSH in first, then run at the remote prompt.

### MongoDB (MERN)

```bash
mongosh
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

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
the service loads at startup — and fill in the values you just created:

```env
NODE_ENV=production
PORT=<port>
SESSION_SECRET=<long-random-string>

DB_URL=postgres://<app-user>:<app-password>@localhost:5432/<app-db>
# MERN uses the Mongo driver's URI instead:
# MONGODB_URI=mongodb://<app-user>:<app-password>@localhost:27017/<app-db>
```

> **Runs on:** the server — SSH in first, then create the file at the remote prompt.

- Keep the file in `shared/`, not in the `current/` release tree. `current/`
  is rebuilt from the repository on every deploy (`rsync --delete`), so a file
  placed there would be deleted. `shared/` persists across releases.
- Never commit `.env` — add it to `.gitignore`.
- Restrict it to the deploy user: `chmod 600 /var/www/<project>/shared/.env`.

These runtime values are separate from the GitHub secrets in Step 6 (the SSH
key, host, user, and port the deploy runner uses). The running app reads this
`.env` file on the server — GitHub secrets are not available to the running
process.

## 3. Set up the schema

Most ORMs create the schema automatically from their model definitions:

- **Sequelize (PERN):** `sequelize.sync()` on startup creates tables on first run.
- **Mongoose (MERN):** collections are created automatically on first write.

If your app requires raw SQL migrations or a `schema.sql`, run those instead
(for example, `psql -U <app-user> -d <app-db> -f schema.sql`).

## 4. Verify the database

Confirm the database is reachable with the credentials from `.env`:

```bash
psql -U <app-user> -d <app-db> -c "SELECT 1"
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

Expected: `psql` connects and prints a single `1` row with no authentication
error. For MongoDB, run `mongosh` and confirm the `use <app-db>` command
succeeds. The service itself does not start until the Step 11 deploy.

---

[← Step 8](https://github.com/annetastic-personal/references/wiki/step-8-install-node-runtime) | [← Back to Index](https://github.com/annetastic-personal/references/wiki/cicd-index) | [Next: Step 10 →](https://github.com/annetastic-personal/references/wiki/step-10-run-node-service)
