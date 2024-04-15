import { EmailTemplate } from '../../../app/_components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const responce = await req.json();
  try {
    const data = await resend.emails.send({
      from: 'FileShare@resend.dev',
      to: ['aradhya.garg@gmail.com'],
      subject: responce?.userName + "Share File With You",
      react: EmailTemplate({ responce }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}