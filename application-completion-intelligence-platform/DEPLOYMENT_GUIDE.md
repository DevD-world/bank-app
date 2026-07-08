# Completion IQ Deployment Guide

## Current Local URL

```text
http://127.0.0.1:8000/mobile.html?v=20260610-demo-ready
```

## Main Pages

- RM mobile app: `/mobile.html?v=20260610-demo-ready`
- Manager dashboard: `/manager.html`
- Pitch walkthrough: `/pitch.html`
- Customer upload portal: `/customer.html?token=<generated-token>`

## Local Production Run

From this folder:

```powershell
.\start-production.ps1
```

Or:

```powershell
python backend/server.py
```

## Render Deployment

1. Push this folder to a GitHub repository.
2. In Render, create a new Blueprint or Web Service.
3. If using Blueprint, select `render.yaml`.
4. If using Web Service manually:
   - Build command: `pip install -r requirements.txt`
   - Start command: `python backend/server.py`
   - Environment variables:
     - `HOST=0.0.0.0`
     - `COMPLETION_IQ_DATA_DIR=/var/data`
     - `COMPLETION_IQ_DB_PATH=/var/data/completion_iq.sqlite3`
     - `COMPLETION_IQ_UPLOAD_DIR=/var/data/uploads`
     - `COMPLETION_IQ_PRODUCTION=1`
     - `COMPLETION_IQ_ALLOWED_ORIGIN=https://your-production-domain.com`
     - `COMPLETION_IQ_API_KEY=<long-random-secret>`
   - Add persistent disk:
     - Mount path: `/var/data`
     - Size: 1 GB

After deploy, check:

```text
https://your-render-service.onrender.com/api/health
https://your-render-service.onrender.com/api/readiness
```

Staff pages call protected APIs with `X-API-Key`. In a staff browser session, set the key once:

```js
completionIqSetStaffApiKey("the-value-from-COMPLETION_IQ_API_KEY")
```

This API key gate is suitable for staging and controlled pilots. Replace it with SSO/OIDC and role-level authorization before regulated banking production.

## Netlify Frontend Deployment

Netlify can host the frontend. Keep the Python backend on Render/Railway/VPS, then set this Netlify environment variable:

```text
BACKEND_URL=https://your-backend-domain.com
```

This project includes a Netlify API proxy at `netlify/functions/api-proxy.mjs`, so the frontend can keep calling `/api/...` from the Netlify domain.

## Docker Deployment

```powershell
docker build -t completion-iq .
docker run -p 8000:8000 -v completion-iq-data:/data completion-iq
```

Then open:

```text
http://localhost:8000/mobile.html?v=20260610-demo-ready
```

## Production Notes

- Host behind HTTPS before any real customer data is uploaded.
- Set `COMPLETION_IQ_ALLOWED_ORIGIN` to the exact HTTPS app domain, never `*`.
- Set `COMPLETION_IQ_API_KEY`; production mode blocks staff APIs when it is absent.
- Use `/api/readiness` as the deploy gate. It intentionally fails until critical production dependencies are configured.
- Replace simulated WhatsApp, CRM, and KYC adapters with approved provider APIs.
- Move from SQLite to PostgreSQL for multi-branch production scale.
- Move OCR work to a queue for high upload volume.
- Add SSO, audit retention, and role-level permissions before bank pilot use.
