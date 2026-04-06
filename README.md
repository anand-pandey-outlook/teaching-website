# teaching-website

Production-style Next.js full-stack app (frontend + backend) with Tailwind CSS, MongoDB, and SMTP.

## Tech Stack

- Next.js (Pages Router)
- Tailwind CSS
- MongoDB via Mongoose
- SMTP email notifications via Nodemailer

## Core Features

- Fully route-based Next.js frontend (no static HTML pages)
- Student/Teacher switch-based lead form with inline validation
- API-backed lead persistence (`/api/submissions`)
- Admin email notification on every successful lead submission
- Health endpoint (`/api/health`) with DB + SMTP status

## Environment

Copy `.env.example` to `.env` and configure:

- `MONGODB_URI`
- `MONGODB_DB`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `ADMIN_EMAIL`

## Local Development

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Production

1. `npm run build`
2. `npm start`

## App Routes

- `/`
- `/individual`
- `/group`
- `/online`
- `/offline`
- `/notes`
- `/materials`
- `/tests`

## API Routes

- `POST /api/submissions`
- `GET /api/health`
