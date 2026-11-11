# Concept tally

A private glossary of terms I've had to look up or re-learn, so I recognize
them next time. One entry per line: `term` — what it is (my words) — how to
recognize it. Prune anything that becomes obvious. (Organization TBD.)

- `agent` — supertest's "pretend browser": a stand-in that carries the login cookie across requests so a test stays logged in. Recognize it by `const agent = request.agent(app)`.
- `??` (nullish coalescing) — "use the left value unless it's null or undefined, otherwise the right one." Recognize it by `a ?? b`.