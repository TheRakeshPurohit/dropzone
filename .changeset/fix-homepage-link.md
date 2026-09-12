---
"dropzone": patch
---

Point `homepage` at `https://www.dropzone.dev/`. It referenced `/js`, a route that only ever redirected to the front page and no longer exists, so the homepage link on npm was a 404.
