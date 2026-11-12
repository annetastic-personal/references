# Concept tally

A private glossary of terms I've had to look up or re-learn, so I recognize
them next time. One entry per line: `term` — what it is (my words) — how to
recognize it. Prune anything that becomes obvious. (Organization TBD.)

- `agent` — supertest's "pretend browser": a stand-in that carries the login cookie across requests so a test stays logged in. Recognize it by `const agent = request.agent(app)`.
- `??` (nullish coalescing) — "use the left value unless it's null or undefined, otherwise the right one." Recognize it by `a ?? b`.
- `async`/`await` — await pauses the function while waiting for a promise to resolve to a value. Everything outside the function keeps running, but the function pauses at the await line until its promise has resolved. An async function returns a promise that will ultimately be resolved to a value. Anything calling an async function needs to "await" the response so it will not try to use the promise before it has resolved. When a return value from a function is read as "undefined", check to see if the function is an async function and if the call is properly awaited.