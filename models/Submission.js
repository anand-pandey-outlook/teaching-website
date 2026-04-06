const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: ['student', 'teacher', 'popup', 'quick', 'contact'],
      required: true,
      index: true
    },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    className: { type: String, trim: true },
    board: { type: String, trim: true },
    subjects: [{ type: String, trim: true }],
    mode: { type: String, trim: true },
    time: { type: String, trim: true },
    qualification: { type: String, trim: true },
    experience: { type: String, trim: true },
    city: { type: String, trim: true },
    message: { type: String, trim: true },
    meta: {
      source: { type: String, trim: true },
      page: { type: String, trim: true },
      userAgent: { type: String, trim: true }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Submission', submissionSchema);
