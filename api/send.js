const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sandeepmagi06@gmail.com",
      pass: "mggw ysix wnnn kpls" // App password
    }
  });

  const mailOptions = {
    from: email,
    to: "sandeepmagi06@gmail.com",
    subject: `Portfolio Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
    return res.status(500).json({ error: "Error sending email" });
  }
}
