# Repository Instructions

- This repo is the official source for the MoreFun mobile ordering web app.
- Google Sheet Backend is the source of truth for business data.
- GitHub hardcode/static data is fallback only.
- Never expose `ADMIN_API_SECRET` in frontend code or frontend-readable files.
- Do not change business logic unless explicitly requested.

## Workflow

For every task:

1. Inspect first.
2. Propose affected files.
3. Make minimal changes.
4. Run available tests/build.
5. Report changed files and risks.

If data differs between frontend fallback and Backend API, do not guess. Report the diff.

## Backend API

Base URL:

```text
https://script.google.com/macros/s/AKfycbzeCzRBI3dnG9TS9-hb3q2j9cfxUJlEpVY8ybjDO-RTkVFNGlAh2EKfKjHerRVWPQrlig/exec
```

Current passed public APIs:

- `navigation.get`
- `ui.theme.get`
- `store.hours.get`
