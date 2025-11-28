import { Resend } from "resend";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  try {
    const response = await resend.emails.send({
      from: "Real Estate App <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};
