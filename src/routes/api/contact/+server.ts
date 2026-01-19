import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

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

        // Get access key from environment
        const accessKey = env.VITE_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.error('Web3Forms access key not found in environment variables');
            return json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Send to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: accessKey,
                name,
                email,
                message,
                to: 'raffayudapratama20@gmail.com',
                subject: `Portfolio Contact from ${name}`
            })
        });

        const result = await response.json();

        if (result.success) {
            return json({ success: true, message: 'Message sent successfully' });
        } else {
            return json(
                { success: false, message: result.message || 'Failed to send message' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Contact form error:', error);
        return json(
            { success: false, message: 'Server error. Please try again.' },
            { status: 500 }
        );
    }
};
