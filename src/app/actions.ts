'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { RateLimiter } from '@/lib/rate-limiter';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);
const rateLimiter = new RateLimiter();

const sendEmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),
  message: z.string().nonempty({ message: 'Message is required' }),
});

export async function sendEmail(formData: FormData) {
  const headerList = await headers();
  const ipAddress = headerList.get('x-forwarded-for') || headerList.get('x-real-ip') || '127.0.0.1';

  const result = rateLimiter.consume(ipAddress);

  if (!result.success) {
    return { error: { message: 'Too many requests. Please try again later.' } };
  }

  const parsed = sendEmailSchema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    const firstErrorMessage = parsed.error.issues[0]?.message || 'Invalid form data.';
    return { error: { message: firstErrorMessage } };
  }

  const { email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // Replace with your verified Resend domain
      to: 'sahandportfolio@gmail.com', // Your recipient email
      subject: 'New Contact Form Submission',
      replyTo: email,
      html: `
        <p>From: ${email}</p>
        <p>Message: ${message}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: { message: 'Failed to send message. Please try again later.' } };
  }
}
