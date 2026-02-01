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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body style="margin: 0; padding: 0; background-color: white; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: white; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="680" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.4);">
                    
                    <!-- Main Container -->
                    <tr>
                        <td style="padding: 0;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <!-- Left Content Column -->
                                    <td style="width: 55%; vertical-align: top; padding: 60px 40px 60px 60px; background-color: #ffffff;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <!-- Logo -->
                                            <tr>
                                                <td style="padding-bottom: 40px;">
                                                    <img src="https://boday.my.id/images/logo-boday-black.png" alt="Logo" style="height: 40px; filter: brightness(0);">
                                                </td>
                                            </tr>
                                            
                                            <!-- Navigation -->
                                            <tr>
                                                <td style="padding-bottom: 50px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="padding-right: 30px;">
                                                                <a href="https://boday.my.id" style="color: #1a1a1a; text-decoration: none; font-size: 14px; font-weight: 600;">Home</a>
                                                            </td>
                                                            <td>
                                                                <a href="https://boday.my.id/portfolio" style="color: #999999; text-decoration: none; font-size: 14px; font-weight: 400;">Portfolio</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                            <!-- Greeting -->
                                            <tr>
                                                <td style="padding-bottom: 20px;">
                                                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #1a1a1a; line-height: 1.2;">From ${name}!</h1>
                                                    <p style="margin: 0; font-size: 14px; color: #ddd;">
                                                                    <a href="mailto:${email}" style="color: #ddd; text-decoration: none;">${email}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            
                                            <!-- Message -->
                                            <tr>
                                                <td style="padding-bottom: 35px;">
                                                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.7;">
                                                        ${message.replace(/\n/g, '<br>')}
                                                    </p>
                                                </td>
                                            </tr>
    
                                        
                                            
                                            <!-- CTA Button -->
                                            <tr>
                                                <td style="padding-bottom: 60px;">
                                                    <table cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="background-color: #4169e1; border-radius: 6px; padding: 14px 32px;">
                                                                <a href="mailto:${email}" style="color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">REPLY NOW</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                            <!-- Footer Text -->
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; font-size: 12px; color: #999999; line-height: 1.6;">
                                                        For further assistance, feel free to email us at<br>
                                                        <a href="mailto:info@boday.my.id" style="color: #4169e1; text-decoration: none;">info@boday.my.id</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    
                                    <!-- Right Mascot Column -->
                                    <td style="width: 45%; vertical-align: middle; padding: 60px 40px; background-color: #f5f5f5; text-align: center; position: relative;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <!-- Social Icons -->
                                            <tr>
                                                <td align="right" style="padding-bottom: 40px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" style="float: right;">
                                                        <tr>
                                                            <td style="padding-left: 12px;">
                                                                <a href="https://github.com/raffayuda" style="display: inline-block; width: 36px; height: 36px; background-color: #d0d0d0; border-radius: 50%; text-align: center; text-decoration: none; padding: 6px;">
                                                                    <img src="https://boday.my.id/images/github-icon.png" alt="GitHub" style="width: 24px; height: 24px; display: block;">
                                                                </a>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <a href="https://instagram.com/raffayudapratama06" style="display: inline-block; width: 36px; height: 36px; background-color: #d0d0d0; border-radius: 50%; text-align: center; text-decoration: none; padding: 6px;">
                                                                    <img src="https://boday.my.id/images/instagram-icon.png" alt="Instagram" style="width: 24px; height: 24px; display: block;">
                                                                </a>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <a href="https://linkedin.com/in/raffayuda" style="display: inline-block; width: 36px; height: 36px; background-color: #d0d0d0; border-radius: 50%; text-align: center; text-decoration: none; padding: 6px;">
                                                                    <img src="https://boday.my.id/images/linkedin-icon.png" alt="LinkedIn" style="width: 24px; height: 24px; display: block;">
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            
                                            <!-- Mascot Image -->
                                            <tr>
                                                <td align="center" style="padding-top: 20px;">
                                                    <img src="https://boday.my.id/images/mascot.png" alt="Mascot" style="max-width: 280px; width: 100%; height: auto; display: block; margin: 0 auto;">
                                                </td>
                                            </tr>
                                            
                                            <!-- Attribution -->
                                            <tr>
                                                <td align="right" style="padding-top: 20px;">
                                                    <p style="margin: 0; font-size: 10px; color: #cccccc; text-align: right;">
                                                        <a href="https://boday.my.id/unsubscribe" style="color: #cccccc; text-decoration: none;">Unsubscribe</a>
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
