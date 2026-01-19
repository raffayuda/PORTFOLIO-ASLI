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

        console.log('Access key exists:', !!accessKey);
        console.log('Access key length:', accessKey?.length);

        if (!accessKey) {
            console.error('Web3Forms access key not found in environment variables');
            return json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const payload = {
            access_key: accessKey,
            name,
            email,
            message,
            subject: `Portfolio Contact from ${name}`
        };

        console.log('Sending to Web3Forms with payload:', { ...payload, access_key: '***' });

        // Send to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log('Web3Forms response status:', response.status);
        console.log('Web3Forms response headers:', Object.fromEntries(response.headers.entries()));

        const responseText = await response.text();
        console.log('Web3Forms raw response:', responseText.substring(0, 200));

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse Web3Forms response as JSON:', e);
            return json(
                { success: false, message: 'Invalid response from email service' },
                { status: 500 }
            );
        }

        if (result.success) {
            return json({ success: true, message: 'Message sent successfully' });
        } else {
            console.error('Web3Forms returned error:', result);
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
