const transporter = require("../configuration/mailer");

// Envoi d’un mail de bienvenue
exports.sendWelcomeEmail = async (userEmail, userName) => {
  try {
    await transporter.sendMail({
      from: `"Parfum Algarve Shop" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Bienvenue 💐",
      html: `
        <h2>Bienvenue, ${userName} !</h2>
        <p>Merci de rejoindre Parfum Algarve Shop 🌸</p>
        <p>Nous sommes ravis de vous compter parmi nous.</p>
      `,
    });
    console.log("✅ Email de bienvenue envoyé à", userEmail);
  } catch (error) {
    console.error("❌ Erreur lors de l’envoi du mail :", error);
  }
};
