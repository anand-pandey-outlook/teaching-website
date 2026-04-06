# teaching-website

Static website + Node/Express backend with MongoDB form storage and SMTP admin notifications.

## Run locally

1. Install dependencies:
   npm install
2. Create env file:
   cp .env.example .env
3. Set MongoDB + SMTP values inside `.env`.
4. Start server:
   npm start
5. Open:
   http://localhost:3000

## API

- `POST /api/submissions`
  - Stores student, teacher, popup, quick, and contact submissions.
  - Sends email to admin when SMTP is configured.
- `GET /api/health`
  - Health check + Mongo connection state + SMTP configured flag.

## Notes

- Frontend still opens WhatsApp as before.
- Forms now also attempt to persist data in MongoDB through the backend API.
- Admin lead email notifications are optional and enabled only when SMTP env vars are present.
