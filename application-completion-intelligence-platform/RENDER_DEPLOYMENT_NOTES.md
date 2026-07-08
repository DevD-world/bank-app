# Banking / Completion IQ Render Deployment

Service name: `banking`

Build command:
```bash
pip install -r requirements.txt
```

Start command:
```bash
python backend/server.py
```

Required environment variables:
```bash
HOST=0.0.0.0
COMPLETION_IQ_DATA_DIR=/var/data
COMPLETION_IQ_DB_PATH=/var/data/completion_iq.sqlite3
COMPLETION_IQ_UPLOAD_DIR=/var/data/uploads
COMPLETION_IQ_PRODUCTION=1
COMPLETION_IQ_ALLOWED_ORIGIN=https://your-production-domain.com
COMPLETION_IQ_API_KEY=<long-random-secret>
COMPLETION_IQ_DATABASE_KIND=sqlite
COMPLETION_IQ_OCR_PROVIDER=<azure-document-intelligence|google-document-ai|aws-textract|linux-worker>
```

Recommended persistent disk:
```bash
Name: banking-data
Mount path: /var/data
Size: 1 GB
```

Important OCR note:
The local demo OCR uses Windows OCR through `backend/windows_ocr.ps1`, which will not run on Render's Linux runtime. The deployed app and workflows will run, but production OCR should use Azure Document Intelligence, Google Document AI, AWS Textract, or a Linux OCR worker.

Deployment gate:
Open `/api/readiness` after deploy. It returns blocking checks for API auth, CORS, OCR provider, persistence, and production mode.
