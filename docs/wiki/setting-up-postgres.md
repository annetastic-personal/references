# Setting up PostgreSQL

Repository-agnostic how-to for first-time PostgreSQL setup on a Debian/Ubuntu
server and connecting to it from pgAdmin over SSH.

## 1. Install PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

Installing creates a `postgres` superuser role and starts the `postgresql`
systemd service automatically.

## 2. Set the `postgres` password

The `postgres` superuser starts with no password — until you set one, the only
way in is via the OS user:

```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '<strong-password>';"
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

`sudo -u postgres psql` switches to the `postgres` system user, which Postgres
trusts without a password. That's the one place you get in for free — every
other connection (including pgAdmin) needs a password. Remember this password;
you'll use it in step 3.

## 3. Connect pgAdmin over SSH

pgAdmin runs on your machine, but PostgreSQL only listens on the server's
`localhost` — so pgAdmin tunnels through SSH to reach it. Two separate logins
happen in sequence; don't mix up their credentials.

### 3a. SSH tunnel — into the server (key, no password)

| Field | Value |
| --- | --- |
| Use SSH tunneling | checked |
| Tunnel host | the server's IP / hostname |
| Tunnel port | the SSH port (often `22`) |
| Username | the Linux user you SSH in as (e.g. `debian`) |
| Authentication | Identity file — your private key |

This login is your SSH private key — not a password (password auth is disabled
on the server).

### 3b. Connection — into PostgreSQL (username + password)

| Field | Value |
| --- | --- |
| Host name/address | `localhost` |
| Port | `5432` |
| Maintenance database | `postgres` (for admin) or the app's DB |
| Username | the Postgres role (`postgres` for admin) |
| Password | that role's password |

This login is a username + password — the `postgres` password you set in step 2.

> **Don't confuse the two.** `debian` can appear in both places — as the Linux
> user in the SSH tunnel (key) and as a Postgres role in the connection
> (password). They're unrelated even when spelled the same.

## 4. Roles and databases

Administer as the `postgres` superuser (connect pgAdmin as `postgres`). Give
each application its own dedicated role and a database owned by that role, so
the app gets least privilege — it can only touch its own database, and a
compromised app never gets superuser access.

```bash
sudo -u postgres psql -c "CREATE ROLE <app-user> WITH LOGIN PASSWORD '<app-password>';"
sudo -u postgres psql -c "CREATE DATABASE <app-db> OWNER <app-user>;"
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

- `<app-user>` is the Postgres role the app logs in as (e.g. `ttgcollector`) —
  not the Linux/SSH user.
- `<app-db>` is the database name (e.g. `ttgcollector`).
- The app connects as `<app-user>`; you administer as `postgres`.

## 5. Troubleshooting

### "password authentication failed for user postgres"

This is a wrong or unset password — not a wrong server. Verify on the server:

```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '<strong-password>';"
PGPASSWORD='<strong-password>' psql -h 127.0.0.1 -U postgres -d postgres -c "SELECT 1;"
```

> **Runs on:** the server — SSH in first, then run at the remote prompt.

If the second command prints `1`, that password is correct — use the same one in
pgAdmin.

### The error says `127.0.0.1`, port `56085`

That's pgAdmin's own local SSH-tunnel endpoint (it picks a random local port),
not a wrong server.

### Connection refused or timeout

The SSH tunnel didn't establish. Re-check the tunnel host, SSH port, username,
and that your private key is selected.
