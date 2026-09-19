# SSH Troubleshooting

A general reference for diagnosing SSH connection problems — whether for
housekeeping, setting up CI/CD access, or deployment. "Connection timed out" and
"Connection refused" are different signals: a timeout means packets were
silently dropped somewhere along the path; a refusal means the host answered
that nothing is listening on that port.

## Decide where the problem is

1. **Is the server reachable at all?**

   ```bash
   ping <server-ip>
   ```

   - Replies → the host is up; if SSH still fails, a filter is likely dropping
     the SSH traffic.
   - No replies → the host is down, unreachable, or ICMP is blocked. Use the
     provider console.

2. **Is it your IP, or the whole server?** Connect from a different network —
   a phone hotspot is the quickest test:

   ```bash
   ssh -v <user>@<server-ip>
   ```

   - Works from the hotspot → the block is specific to your usual source IP;
     continue to the firewall checks below.
   - Fails from everywhere → the problem is on the server (sshd stopped, wrong
     port, or a host-wide firewall); recover via the provider console.

## Check the firewall

### ufw (Uncomplicated Firewall)

ufw is Debian/Ubuntu's friendly front end to the firewall. On Debian 12+
(including Debian 13) ufw uses the nftables backend, so rules do **not** appear
under `iptables -L` — an empty iptables listing does not mean there is no
firewall. Read ufw instead:

```bash
sudo ufw status verbose
sudo ufw status numbered
sudo systemctl status ufw --no-pager
```

### "Connection timed out" from one IP: the ufw LIMIT rule

A `22/tcp  LIMIT IN` rule allows a small burst of new SSH connections per
source IP and then silently drops the rest. Once your IP exceeds that burst,
new connections time out (not refused) while other IPs connect normally.
Recover by whitelisting your IP *ahead of* the limit rule:

```bash
sudo ufw insert 1 allow from <HOME_IP> to any port 22 proto tcp
sudo ufw status numbered
```

Keep the `LIMIT` rule for everyone else — it is useful brute-force protection;
only whitelist addresses you control. Find your current public IP at
https://api.ipify.org .

> Do not run `ufw disable` or `ufw reset` while locked out; prefer targeted
> `ufw allow` / `ufw insert allow` rules.

### fail2ban

fail2ban also bans source IPs after repeated failures and, like ufw, produces a
timeout. Check and unban:

```bash
sudo fail2ban-client status
sudo fail2ban-client status sshd
sudo fail2ban-client get sshd banned
sudo fail2ban-client set sshd unbanip <HOME_IP>
```

To keep a trusted IP out of jail permanently, add an `ignoreip` line under
`[DEFAULT]` in `/etc/fail2ban/jail.local` and reload:

```bash
sudo systemctl reload fail2ban
```

## Beyond the server

If the server firewall (ufw / fail2ban) is clean but your usual IP still times
out while other networks connect, the block is at the hosting provider's edge —
for example, a provider panel firewall or an automatic abuse/DDoS block. Clear
it from the provider's control panel, not the server shell.

## Server-side checks (via provider console)

If SSH fails from every network, use the provider's web/emergency console to
confirm the daemon is running and listening:

```bash
sudo systemctl status ssh
ss -tlnp | grep :22
```

On Debian the service is `ssh` (older guides may call it `sshd`; they target the
same daemon). If nothing is listening on port 22, start it and inspect the log:

```bash
sudo systemctl enable --now ssh
sudo journalctl -u ssh --no-pager -n 50
```

## Quick reference

| Symptom | Test | Likely cause | Fix |
| --- | --- | --- | --- |
| Timeout, but host pings | Connect from a hotspot | ufw `LIMIT` or fail2ban banned your IP | `ufw insert 1 allow from <IP> …` or `fail2ban-client set sshd unbanip <IP>` |
| Timeout from every network | Provider console | sshd stopped, wrong port, host firewall | start sshd; confirm a listener on 22 |
| Connection refused | From another network | nothing listening on 22 | start sshd |
| `iptables -L` empty but still blocked | `ufw status verbose` | Debian nftables backend | read ufw/nftables, not iptables |
