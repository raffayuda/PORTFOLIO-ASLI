import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Get Gmail credentials from environment
        const gmailUser = env.GMAIL_USER;
        const gmailPassword = env.GMAIL_APP_PASSWORD;

        if (!gmailUser || !gmailPassword) {
            console.error('Gmail credentials not found in environment variables');
            return json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Create transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: gmailUser,
                pass: gmailPassword
            }
        });

        // Email to yourself (notification)
        const mailOptions = {
            from: gmailUser,
            to: gmailUser,
            replyTo: email,
            subject: `Portfolio Contact from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                                    
                                    <!-- Header with Logo -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 40px 30px 40px; text-align: center; position: relative;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="center">
                                                        <img src="https://boday.my.id/images/logo-boday-white.png" alt="Logo" style="height: 50px; margin-bottom: 20px; filter: invert(1) brightness(2);">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center">
                                                        <table cellpadding="0" cellspacing="0" border="0" style="display: inline-block;">
                                                            <tr>
                                                                <td style="vertical-align: middle; padding-right: 15px;">
                                                                    <img src="https://boday.my.id/images/mascot.png" alt="Mascot" style="width: 60px; height: 60px; display: block;">
                                                                </td>
                                                                <td style="vertical-align: middle;">
                                                                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; text-align: left;">New Contact<br/>Message</h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            
                                            <!-- From Info Card -->
                                            <div style="background-color: #fafafa; border-left: 3px solid #1a1a1a; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                    <tr>
                                                        <td style="padding-bottom: 12px;">
                                                            <span style="display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #666;">From</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 8px;">
                                                            <span style="font-size: 18px; font-weight: 600; color: #1a1a1a;">${name}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <a href="mailto:${email}" style="color: #404040; text-decoration: none; font-size: 14px;">${email}</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            
                                            <!-- Message -->
                                            <div style="margin-bottom: 30px;">
                                                <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 15px;">Message</span>
                                                <div style="background-color: #fafafa; padding: 24px; border-radius: 4px; color: #333; font-size: 15px; line-height: 1.7; border: 1px solid #e5e5e5;">
                                                    ${message.replace(/\n/g, '<br>')}
                                                </div>
                                            </div>
                                            
                                            <!-- Reply Button -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="center" style="padding: 20px 0;">
                                                        <a href="mailto:${email}" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 4px; font-weight: 500; font-size: 14px; letter-spacing: 0.5px;">Reply to ${name}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #fafafa; padding: 30px 40px; border-top: 1px solid #e5e5e5;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td style="text-align: center;">
                                                        <p style="margin: 0 0 8px 0; color: #666; font-size: 12px; line-height: 1.5;">
                                                            This message was sent from your portfolio contact form
                                                        </p>
                                                        <p style="margin: 0; color: #999; font-size: 11px;">
                                                            <a href="https://boday.my.id" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">boday.my.id</a>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        console.log('Sending email via Gmail SMTP...');

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully!');

        return json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return json(
            {
                success: false,
                message: 'Failed to send message. Please try again later.'
            },
            { status: 500 }
        );
    }
};
