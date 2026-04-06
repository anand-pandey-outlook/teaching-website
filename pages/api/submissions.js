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
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    })
  : null;

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
  await mailTransporter.sendMail({
    from: EMAIL_FROM,
    to: ADMIN_EMAIL,
    subject: email.subject,
    text: email.text,
    html: email.html
  });
  return { sent: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const payload = req.body || {};
    if (!payload.kind) {
      return res.status(400).json({ ok: false, error: 'kind is required' });
    }

    if (payload.phone && !/^\d{10}$/.test(String(payload.phone).trim())) {
      return res.status(400).json({ ok: false, error: 'phone must be a 10-digit number' });
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

    if (smtpConfigured && !mailStatus.sent) {
      return res.status(502).json({
        ok: false,
        id: submission._id,
        error: 'Lead saved but admin email notification failed',
        mailStatus
      });
    }

    return res.status(201).json({ ok: true, id: submission._id, mailStatus });
  } catch (error) {
    console.error('Submission save failed:', error);
    return res.status(500).json({ ok: false, error: 'Unable to save submission' });
  }
}
