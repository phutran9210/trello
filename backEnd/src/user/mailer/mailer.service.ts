
import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: 'phutran.jp1@gmail.com', // your SMTP username
        pass: '', // your SMTP password
      },
    });
  }

  async sendConfirmationEmail(to: string,user_id : string, token: string) {
    // compose the email
    const info = await this.transporter.sendMail({
      from: '"No Reply" <no-reply@example.com>', // sender address
      to: to, // list of receivers
      subject: 'Registration Confirmation', // Subject line
      text: `Welcome, you have successfully registered! Click on the following link to activate your account : 
      http://localhost:5173/activate?userId=${user_id}&code=${token}`, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
  }

   async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    const info = await this.transporter.sendMail({
      from: '"No Reply" <no-reply@example.com>',
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
