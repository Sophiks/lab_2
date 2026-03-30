const express = require('express');
const { Resend } = require('resend');
const path = require('path');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Будь ласка, заповніть всі поля.' });
    }

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'vynarsofia@gmail.com',
            subject: `Lab 6: ${subject}`,
            html: `
                <h3>Нове повідомлення з сайту</h3>
                <p><strong>Від:</strong> ${name} (${email})</p>
                <p><strong>Повідомлення:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({ success: 'Повідомлення надіслано!' });
    } catch (error) {
        console.error('Resend Error:', error);
        res.status(500).json({ error: 'Помилка сервера при відправці.' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});