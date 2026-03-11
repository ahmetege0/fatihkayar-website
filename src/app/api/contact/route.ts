import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
        }
        const resend = new Resend(apiKey);

        const { subject, message } = await req.json();

        if (!subject || !message) {
            return NextResponse.json({ error: 'Subject and message are required.' }, { status: 400 });
        }

        const { error } = await resend.emails.send({
            from: 'Fatih Kayar Website <onboarding@resend.dev>',
            to: ['aege0601@gmail.com'],
            subject: `[FatihKayar.com] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #333;">
                    <p style="font-size: 11px; letter-spacing: 0.1em; color: #999; text-transform: uppercase; margin-bottom: 24px;">
                        Fatih Kayar — Website Contact Form
                    </p>
                    <h2 style="font-size: 20px; color: #111; margin-bottom: 24px;">${subject}</h2>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 0 0 24px;" />
                    <p style="font-size: 15px; color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }
}
