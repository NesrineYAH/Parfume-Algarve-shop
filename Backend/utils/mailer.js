const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // ou SendGrid, Mailgun...
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fonction pour envoyer un email de vérification
async function sendVerificationEmail(email, token) {
  const verificationUrl = `http://localhost:5173/verify/${token}`;

  await transporter.sendMail({
    from: `"Mon App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirme ton compte",
    html: `<p>Merci de vous inscrire ! Clique sur le lien pour valider ton compte :</p>
           <a href="${verificationUrl}">Valider mon compte</a>`,
  });
}

module.exports = { sendVerificationEmail };
