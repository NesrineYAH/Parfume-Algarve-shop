const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // ton email
    pass: process.env.EMAIL_PASS, // mot de passe d'application
  },
});

async function sendVerificationEmail(email, token) {
  const verificationUrl = `http://localhost:5173/verify/${token}`;
  await transporter.sendMail({
    from: `"Mon App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirme ton compte",
    html: `<a href="${verificationUrl}">Valider mon compte</a>`,
  });
}

module.exports = { sendVerificationEmail };
