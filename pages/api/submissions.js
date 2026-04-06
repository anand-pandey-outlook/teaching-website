import nodemailer from 'nodemailer';
import dbConnect from '../../lib/dbConnect';
import Submission from '../../models/Submission';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER || 'no-reply@utkarsh.local';

const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_EMAIL);
const mailTransporter = smtpConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000
    })
  : null;

const ALLOWED_KINDS = new Set(['student', 'teacher', 'popup', 'quick', 'contact']);

function isValidPhone(phone) {
  return /^\d{10}$/.test(String(phone || '').trim());
}

function validatePayload(payload) {
  const kind = String(payload.kind || '').trim();
  if (!ALLOWED_KINDS.has(kind)) return 'Invalid lead type';

  if (kind === 'student') {
    if (!String(payload.name || '').trim()) return 'Student name is required';
    if (!isValidPhone(payload.phone)) return 'Valid phone is required';
    if (!String(payload.className || '').trim()) return 'Class is required';
    if (!String(payload.board || '').trim()) return 'Board is required';
    if (!Array.isArray(payload.subjects) || payload.subjects.length < 1) return 'At least one subject is required';
    if (!String(payload.mode || '').trim()) return 'Mode is required';
    if (!String(payload.time || '').trim()) return 'Preferred time is required';
    return null;
  }

  if (kind === 'teacher') {
    if (!String(payload.name || '').trim()) return 'Teacher name is required';
    if (!isValidPhone(payload.phone)) return 'Valid phone is required';
    if (!String(payload.qualification || '').trim()) return 'Qualification is required';
    if (!String(payload.experience || '').trim()) return 'Experience is required';
    if (!Array.isArray(payload.subjects) || payload.subjects.length < 1) return 'At least one subject is required';
    if (!String(payload.mode || '').trim()) return 'Mode is required';
    if (!String(payload.time || '').trim()) return 'Availability is required';
    if (!String(payload.city || '').trim()) return 'City is required';
    return null;
  }

  if (kind === 'popup') {
    if (!String(payload.name || '').trim()) return 'Student name is required';
    if (!isValidPhone(payload.phone)) return 'Valid phone is required';
    if (!String(payload.className || '').trim()) return 'Class is required';
    return null;
  }

  if (kind === 'quick') {
    if (!isValidPhone(payload.phone)) return 'Valid phone is required';
    return null;
  }

  if (kind === 'contact') {
    if (!String(payload.name || '').trim()) return 'Name is required';
    if (!isValidPhone(payload.phone)) return 'Valid phone is required';
    return null;
  }

  return null;
}

function formatValue(value) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : '-';
  if (value === undefined || value === null || value === '') return '-';
  return String(value);
}

function buildLeadEmail(submission) {
  const details = [
    ['Kind', submission.kind],
    ['Name', submission.name],
    ['Phone', submission.phone],
    ['Class', submission.className],
    ['Board', submission.board],
    ['Subjects', submission.subjects],
    ['Mode', submission.mode],
    ['Time', submission.time],
    ['Qualification', submission.qualification],
    ['Experience', submission.experience],
    ['City', submission.city],
    ['Message', submission.message],
    ['Source', submission.meta?.source],
    ['Page', submission.meta?.page],
    ['User Agent', submission.meta?.userAgent],
    ['Created At', submission.createdAt]
  ];

  const text = details.map(([k, v]) => `${k}: ${formatValue(v)}`).join('\n');
  const htmlRows = details
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px;border:1px solid #e5e7eb;font-weight:600;">${k}</td><td style="padding:8px;border:1px solid #e5e7eb;">${formatValue(
          v
        )}</td></tr>`
    )
    .join('');

  return {
    subject: `New Lead Submission: ${formatValue(submission.kind).toUpperCase()}`,
    text: `A new lead was submitted.\n\n${text}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#111827;">
        <h2 style="margin-bottom:12px;">New Lead Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:760px;">${htmlRows}</table>
      </div>
    `
  };
}

async function notifyAdminLead(submission) {
  if (!mailTransporter) return { sent: false, reason: 'smtp_not_configured' };

  const email = buildLeadEmail(submission);
  await Promise.race([
    mailTransporter.sendMail({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: email.subject,
      text: email.text,
      html: email.html
    }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('smtp_timeout')), 10000))
  ]);
  return { sent: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const payload = req.body || {};
    const validationError = validatePayload(payload);
    if (validationError) {
      return res.status(400).json({ ok: false, error: validationError });
    }

    const submission = await Submission.create({
      kind: payload.kind,
      name: payload.name,
      phone: payload.phone,
      className: payload.className,
      board: payload.board,
      subjects: Array.isArray(payload.subjects) ? payload.subjects : [],
      mode: payload.mode,
      time: payload.time,
      qualification: payload.qualification,
      experience: payload.experience,
      city: payload.city,
      message: payload.message,
      meta: {
        source: payload.meta?.source,
        page: payload.meta?.page || req.headers.referer || '',
        userAgent: req.headers['user-agent'] || ''
      }
    });

    let mailStatus = { sent: false, reason: null };
    try {
      mailStatus = await notifyAdminLead(submission);
    } catch (mailErr) {
      mailStatus = { sent: false, reason: 'smtp_send_failed' };
      console.error('Lead email notification failed:', mailErr.message);
    }

    return res.status(201).json({
      ok: true,
      id: submission._id,
      mailStatus,
      message: mailStatus.sent
        ? 'Lead captured and admin notified'
        : 'Lead captured; admin notification is pending retry'
    });
  } catch (error) {
    console.error('Submission save failed:', error);
    return res.status(500).json({ ok: false, error: 'Service is temporarily unavailable' });
  }
}
