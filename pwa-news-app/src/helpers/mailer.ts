import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

type SendMail = {
  email: string;
  emailType: "VERIFY" | "FORGOT";
  userId: string;
};

export const sendMail = async ({ email, emailType, userId }: SendMail) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set:{
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $set:{
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    }

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashToken}`
        : `${process.env.DOMAIN}/reset-password?token=${hashToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_APP_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const mailResponse = await transporter.sendMail({
      from: `"PWA News App" <${process.env.GOOGLE_APP_USER}>`,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click the link below:</p>
        <a href="${link}">${link}</a>
      `,
    });

    return mailResponse;
  } catch (error: any) {
    console.error("Error while sending mail:", error.message);
    throw error;
  }
};
