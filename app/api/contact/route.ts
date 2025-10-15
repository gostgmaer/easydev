import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with actual email service integration
// Example services: SendGrid, Mailgun, AWS SES, Resend

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, budget, timeline } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'contact@easydev.in',
      from: 'noreply@kishorsarkar.dev',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };
    
    await sgMail.send(msg);
    */

    // PLACEHOLDER: Log the form submission
    console.log('📧 Contact Form Submission:', {
      name,
      email,
      subject,
      message,
      budget,
      timeline,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to database if needed
    // Example with Supabase:
    /*
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          subject,
          message,
          budget,
          timeline,
          created_at: new Date().toISOString(),
        }
      ]);
    
    if (error) throw error;
    */

    // TODO: Send auto-reply email to user
    /*
    const autoReply = {
      to: email,
      from: 'contact@easydev.in',
      subject: 'Thank you for contacting me!',
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>I've received your inquiry about "${subject}" and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Kishor Sarkar</p>
      `,
    };
    
    await sgMail.send(autoReply);
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully! (PLACEHOLDER - No actual email sent)' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}