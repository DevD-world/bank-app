# Banking Support / Completion IQ - Full Code Package

Main app folder:
application-completion-intelligence-platform

Local run:
cd application-completion-intelligence-platform
pip install -r requirements.txt
python backend/server.py

Local URL:
http://127.0.0.1:8000/mobile.html?v=20260708-alert-correct-ocr

Render deployment:
Use the top-level render.yaml if your Git repo root contains this package structure.
If you upload only the application-completion-intelligence-platform folder, use the render.yaml inside that folder.

Environment variables are listed in application-completion-intelligence-platform/.env.example

Important:
Windows OCR is local/demo only. On Render Linux, connect Azure Document Intelligence, Google Document AI, AWS Textract, or a Linux OCR worker for production OCR.

Production hardening:
Set COMPLETION_IQ_PRODUCTION=1, restrict COMPLETION_IQ_ALLOWED_ORIGIN to your HTTPS domain, and set COMPLETION_IQ_API_KEY to a long random secret before exposing staff pages. After deploy, open /api/readiness and resolve any blocking checks before calling it production.
