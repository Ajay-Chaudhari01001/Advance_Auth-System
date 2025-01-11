import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

export const mailtrapClient = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN || "e47510ba14a014b2ec9214de803ef313",
});

export const sender = {
    email: "hello@demomailtrap.com",
    name: "Ajay Chaudhari",
};