import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactPayload {
  company: string;
  name: string;
  email: string;
  program?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { company, name, email, program, message } = body;

    if (!company || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const submitted_at = new Date().toISOString();

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const toEmail = process.env.CONTACT_EMAIL ?? 'contact@thefomus.com';

      await resend.emails.send({
        from: 'THE FOMUS <noreply@thefomus.com>',
        to: toEmail,
        replyTo: email,
        subject: `New Enquiry: ${company} — ${program ?? 'Not specified'}`,
        text: [
          `Company:   ${company}`,
          `Name:      ${name}`,
          `Email:     ${email}`,
          `Programme: ${program ?? 'Not specified'}`,
          ``,
          `Message:`,
          message,
          ``,
          `Submitted: ${submitted_at}`,
        ].join('\n'),
      });
    } else {
      // Dev fallback
      console.log('[THE FOMUS] New enquiry (RESEND_API_KEY not set):', {
        company, name, email, program, message, submitted_at,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[THE FOMUS] Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
