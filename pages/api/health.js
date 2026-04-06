import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect';

export default async function handler(_req, res) {
  try {
    await dbConnect();
  } catch (_err) {
    // Return state below even when initial connect failed.
  }

  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ADMIN_EMAIL
  );

  return res.status(200).json({
    ok: true,
    dbState: mongoose.connection.readyState,
    smtpConfigured
  });
}
